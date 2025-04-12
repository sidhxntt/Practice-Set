import os
import platform
import sys

class ProjectSetup:
    def __init__(self, name="my_project", venv_name="venv", dependencies=None):
        self.project_name = name
        self.venv_name = venv_name
        self.dependencies = dependencies or ["requests"]
        self.main_py_content = (
            'import requests\nprint(requests.get("https://api.github.com").status_code)'
        )

    def run(self, cmd):
        print(f">>> {cmd}")
        os.system(cmd)

    def create_project_structure(self):
        print("📁 Creating project directory...")
        project_path = os.path.join(os.getcwd(), self.project_name)
        if os.path.exists(project_path):
            print(f"⚠️  Directory '{self.project_name}' already exists. Please remove it or choose a different name.")
            sys.exit(1)
        os.makedirs(project_path)
        os.chdir(project_path)

    def create_virtualenv(self):
        print("🐍 Creating virtual environment...")
        self.run(f"python3 -m venv {self.venv_name}")

    def install_dependencies(self):
        print("📦 Installing dependencies...")
        pip_path = (
            os.path.join(self.venv_name, "Scripts", "pip")
            if platform.system() == "Windows"
            else os.path.join(self.venv_name, "bin", "pip")
        )
        for dep in self.dependencies:
            self.run(f"{pip_path} install {dep}")

    def freeze_requirements(self):
        print("🧊 Freezing dependencies...")
        pip_path = (
            os.path.join(self.venv_name, "Scripts", "pip")
            if platform.system() == "Windows"
            else os.path.join(self.venv_name, "bin", "pip")
        )
        self.run(f"{pip_path} freeze > requirements.txt")

    def create_main_py(self):
        print("📝 Creating main.py...")
        with open("main.py", "w") as f:
            f.write(self.main_py_content)

    def summary(self):
        print("\n✅ Done!")
        print("🚀 Your Python project is ready to go!")
        print(f"\n📂 Navigate to: {self.project_name}")
        if platform.system() == "Windows":
            print(f"🧪 Run with: {self.venv_name}\\Scripts\\activate && python main.py")
        else:
            print(f"🧪 Run with: source {self.venv_name}/bin/activate && python main.py")

    def run_all(self):
        self.create_project_structure()
        self.create_virtualenv()
        self.install_dependencies()
        self.freeze_requirements()
        self.create_main_py()
        self.summary()


if __name__ == "__main__":
    setup = ProjectSetup()
    setup.run_all()
