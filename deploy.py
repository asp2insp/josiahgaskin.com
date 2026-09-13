#!/usr/bin/env python3
"""
Deploy script for josiahgaskin.com
Builds the Hugo site and deploys to remote host via rsync
"""

import os
import sys
import subprocess
from pathlib import Path

try:  # Python 3.11+ has a TOML reader built in; the toml package is optional.
    import tomllib as _toml

    def _load_toml(f):
        return _toml.load(f)

    _TOML_MODE = "rb"
except ImportError:  # pragma: no cover
    import toml as _toml

    def _load_toml(f):
        return _toml.load(f)

    _TOML_MODE = "r"

def load_secrets():
    """Load deployment credentials from secrets.toml"""
    secrets_path = Path(__file__).parent / "secrets.toml"
    if not secrets_path.exists():
        print(f"Error: secrets.toml not found at {secrets_path}")
        sys.exit(1)

    with open(secrets_path, _TOML_MODE) as f:
        return _load_toml(f)

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
        # Use rsync with sshpass to handle password authentication
        print(f"📤 Syncing files from {local_public} to {username}@{host}:{destination}...")
        rsync_cmd = [
            "rsync",
            "-avz",
            f"{local_public}/",
            f"{username}@{host}:{destination}"
        ]

        # Set up environment with sshpass
        env = os.environ.copy()
        env['SSHPASS'] = password

        result = subprocess.run(
            ["sshpass", "-e"] + rsync_cmd,
            cwd=Path(__file__).parent,
            capture_output=True,
            text=True,
            env=env
        )

        if result.returncode != 0:
            print(f"❌ Rsync failed: {result.stderr}")
            return False

        print("✅ Deployment successful!")
        return True

    except FileNotFoundError:
        print("❌ Error: sshpass not found. Install with: brew install sshpass")
        return False
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
