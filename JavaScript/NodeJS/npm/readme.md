npm -i {package_name} -> saves as dependency (required for the app to run)

npm -i {package_name} --D -> saves as Developer dependency (optional ie onky required for it to develop)

.gitignore ---> ignore node_modules as no need to push because they will be installed via NPM when package.json (npm install) is there( its like // python -> pip install requirement.txt)