import os
import sys
import shutil

class ProjectSetup2:
    def __init__(self, name="project_initialisation_new_way", dependencies=None):
        self.project_name = name
        self.dependencies = dependencies or ["requests"]
        self.main_py_content = (
            'import requests\nprint(requests.get("https://api.github.com").status_code)'
        )

    def run(self, cmd):
        print(f">>> {cmd}")
        os.system(cmd)

    def check_pdm_installed(self):
        print("🔍 Checking if PDM is installed...")
        if shutil.which("pdm") is None:
            print("❌ PDM is not installed. Install it from https://pdm-project.org")
            sys.exit(1)

    def create_project_structure(self):
        print("📁 Creating project directory...")
        project_path = os.path.join(os.getcwd(), self.project_name)
        if os.path.exists(project_path):
            print(f"⚠️  Directory '{self.project_name}' already exists. Please remove it or choose a different name.")
            sys.exit(1)
        os.makedirs(project_path)
        os.chdir(project_path)

    def pdm_init(self):
        print("🚀 Initializing PDM project...")
        self.run("pdm init -n")

    def install_dependencies(self):
        print("📦 Adding dependencies with PDM...")
        for dep in self.dependencies:
            self.run(f"pdm add {dep}")

    def create_main_py(self):
        print("📝 Creating main.py...")
        with open("main.py", "w") as f:
            f.write(self.main_py_content)

    def summary(self):
        print("\n✅ Done!")
        print("🚀 Your Python project is ready to go!")
        print(f"\n📂 Navigate to: {self.project_name}")
        print("🧪 Run your app with:")
        print("pdm run python main.py")

    def run_all(self):
        self.check_pdm_installed()
        self.create_project_structure()
        self.pdm_init()
        self.install_dependencies()
        self.create_main_py()
        self.summary()


if __name__ == "__main__":
    setup = ProjectSetup2()
    setup.run_all()


# # 1. Create project directory
# mkdir my_project && cd my_project

# # 2. Initialize PDM
# pdm init -n  # or walk through prompts interactively

# # 3. Add dependencies
# pdm add requests

# # 4. Create your Python file
# echo 'import requests\nprint(requests.get("https://api.github.com").status_code)' > main.py

# # 5. Run the app (no need to activate virtualenv manually)
# pdm run python main.py
