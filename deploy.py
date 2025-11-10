#!/usr/bin/env python3
"""
Deploy script for josiahgaskin.com
Builds the Hugo site and deploys to remote host via Fabric
"""

import os
import sys
import subprocess
import toml
from pathlib import Path
from fabric import Connection

def load_secrets():
    """Load deployment credentials from secrets.toml"""
    secrets_path = Path(__file__).parent / "secrets.toml"
    if not secrets_path.exists():
        print(f"Error: secrets.toml not found at {secrets_path}")
        sys.exit(1)

    with open(secrets_path, 'r') as f:
        return toml.load(f)

def build_hugo():
    """Run hugo build and return True if successful"""
    print("🏗️  Building Hugo site...")
    result = subprocess.run(["hugo"], cwd=Path(__file__).parent)

    if result.returncode != 0:
        print("❌ Hugo build failed!")
        return False

    print("✅ Hugo build successful!")
    return True

def deploy_via_rsync(secrets):
    """Deploy the public folder to remote host via rsync over SSH"""
    host = secrets['host']
    username = secrets['username']
    password = secrets['password']
    destination = secrets['destination']

    local_public = Path(__file__).parent / "public"

    if not local_public.exists():
        print(f"Error: public folder not found at {local_public}")
        return False

    print(f"🚀 Deploying to {host}:{destination}")

    try:
        # Connect via SSH and ensure destination directory exists
        with Connection(host, user=username, connect_kwargs={"password": password}) as conn:
            print(f"📁 Ensuring destination directory exists...")
            conn.run(f"mkdir -p {destination}", hide=True)

        # Use rsync to sync files
        print(f"📤 Syncing files from {local_public} to {username}@{host}:{destination}...")
        rsync_cmd = f"rsync -avz --delete {local_public}/ {username}@{host}:{destination}"

        # Create a temporary password file for non-interactive auth
        result = subprocess.run(
            rsync_cmd,
            shell=True,
            cwd=Path(__file__).parent,
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            print(f"❌ Rsync failed: {result.stderr}")
            return False

        print("✅ Deployment successful!")
        return True

    except Exception as e:
        print(f"❌ Deployment failed: {e}")
        return False

def main():
    """Main deployment flow"""
    print("Starting deployment process...\n")

    # Load secrets
    secrets = load_secrets()

    # Build Hugo
    if not build_hugo():
        sys.exit(1)

    print()

    # Deploy via rsync
    if not deploy_via_rsync(secrets):
        sys.exit(1)

    print("\n✨ Deployment complete!")

if __name__ == "__main__":
    main()
