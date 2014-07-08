---
title: "Quickstart for Firebase with Android Studio"
date: "2014-05-31"
description: "Getting started with Firebase 1 on Android Studio Early Access Preview"
aliases: []
linktitle: "getting-started-with-firebase-on-android-studio-preview"
groups: ['tutorials']
groups_weight: 1
---

Prerequisites
-------------

 * Android Studio Early Access Preview ([download page](http://developer.android.com/sdk/installing/studio.html))
 * A Firebase account ([signup page](https://www.firebase.com/account))

Setup
-----

## Create the Project

Use the New Project Wizard to create a new project. I selected a minimum SDK of 15 (supports more than 80% of the devices that have been [active on the Google Play Store](https://developer.android.com/about/dashboards/index.html) in the last month). Otherwise, I left all the options on their default values.

{{% responsiveslides /static/img/tutorials/android-studio/createproject-details.png /static/img/tutorials/android-studio/createproject-addactivity.png /static/img/tutorials/android-studio/createproject-parameters.png /static/img/tutorials/android-studio/project-overview.png %}}

If you're following along at home, your project structure should look similar to the last slide above.

## Add Firebase

First, we need to add Firebase to our project. Since we're using Gradle, we can just add a dependency to our module's `build.gradle` file:{{% footnote 1 %}}Note that you should never add dependencies to the top-level `build.gradle` file, but only to the `build.gradle` file in individual modules.{{% /footnote %}}

{{% codeblockwithsyntax %}}
dependencies {
    // Other dependencies here
    compile 'com.firebase:firebase-client:1.0.7+'
}
{{% /codeblockwithsyntax %}}

The Firebase client library needs to be able to communicate with the cloud, so we'll need to add the [internet](http://developer.android.com/reference/android/Manifest.permission.html#INTERNET) permission to our app's `AndroidManifest.xml`:

{{% codeblockwithsyntax %}}
&lt;manifest xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    package=&quot;com.josiahgaskin.attendancetracker&quot; &gt;
    &lt;uses-permission android:name=&quot;android.permission.INTERNET&quot; /&gt;
    &lt;application&gt;
    ...
    &lt;/application&gt;
&lt;/manifest&gt;
{{% /codeblockwithsyntax %}}

## UI

Let's add some content to our app. We're going to edit our `activity_main.xml` file and add a [ListView](http://developer.android.com/reference/android/widget/ListView.html) which will hold our list of students and a text field to let us add a new student to the list:

{{% codeblockwithsyntax previewImage="/static/img/tutorials/android-studio/student-list.png" %}}
&lt;LinearLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;
    xmlns:tools=&quot;http://schemas.android.com/tools&quot;
    android:layout_width=&quot;match_parent&quot;
    android:layout_height=&quot;match_parent&quot;
    android:paddingLeft=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingRight=&quot;@dimen/activity_horizontal_margin&quot;
    android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;
    android:paddingBottom=&quot;@dimen/activity_vertical_margin&quot;
    android:orientation=&quot;vertical&quot;
    tools:context=&quot;com.josiahgaskin.attendancetracker.MainActivity&quot;&gt;

    &lt;ListView
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;0dp&quot;
        android:id=&quot;@+id/student_list&quot;
        android:layout_gravity=&quot;center_horizontal|top&quot;
        android:layout_weight=&quot;0.85&quot; /&gt;

    &lt;LinearLayout
        android:orientation=&quot;horizontal&quot;
        android:layout_width=&quot;match_parent&quot;
        android:layout_height=&quot;0dp&quot;
        android:layout_gravity=&quot;center_horizontal|bottom&quot;
        android:paddingTop=&quot;@dimen/activity_vertical_margin&quot;
        android:layout_weight=&quot;0.15&quot;&gt;

        &lt;EditText
            android:layout_width=&quot;0dp&quot;
            android:layout_height=&quot;wrap_content&quot;
            android:inputType=&quot;textPersonName&quot;
            android:text=&quot;Student Name&quot;
            android:ems=&quot;10&quot;
            android:id=&quot;@+id/add_student_name&quot;
            android:layout_weight=&quot;0.8&quot; /&gt;

        &lt;Button
            android:layout_width=&quot;0dp&quot;
            android:layout_height=&quot;wrap_content&quot;
            android:text=&quot;+&quot;
            android:id=&quot;@+id/add_button&quot;
            android:layout_weight=&quot;0.2&quot; /&gt;
    &lt;/LinearLayout&gt;
&lt;/LinearLayout&gt;
{{% /codeblockwithsyntax %}}

Now we need to wire our `ListView` and `EditText` up. 
