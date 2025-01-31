 #!/usr/bin/env bash

 # $1 - Previous HEAD ref
 # $2 - New HEAD ref
 # $3 - Flag indicating if checkout was branch/file

 # Only run on branch checkout, not file checkout
 if [ "$3" = "1" ]; then
     echo 'Checking for changes in yarn.lock...'

     # Compare yarn.lock between old and new refs
     if git diff --name-only $1 $2 | grep -q "^yarn.lock$"; then
         echo "📦 yarn.lock changed. Run yarn to bring your dependencies up to date."
         yarn
     fi

     echo 'You are up to date :)'
 fi

 echo 'If necessary, you can generate again the native code.'

 exit 0