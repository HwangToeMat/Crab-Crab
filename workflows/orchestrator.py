import json
import os
import argparse
from datetime import datetime

class CCMAOrchestrator:
    def __init__(self, base_path):
        self.base_path = base_path
        self.tasks_file = os.path.join(base_path, 'tasks', 'state.json')
        self.agents_dir = os.path.join(base_path, 'agents')
        self.outputs_dir = os.path.join(base_path, 'outputs')
        self.load_state()

    def load_state(self):
        if os.path.exists(self.tasks_file):
            with open(self.tasks_file, 'r') as f:
                self.state = json.load(f)
        else:
            self.state = {"tasks": [], "current_step": 0}

    def save_state(self):
        os.makedirs(os.path.dirname(self.tasks_file), exist_ok=True)
        with open(self.tasks_file, 'w') as f:
            json.dump(self.state, f, indent=4)

    def add_task(self, name, agent, description):
        task = {
            "id": len(self.state["tasks"]) + 1,
            "name": name,
            "agent": agent,
            "description": description,
            "status": "Pending",  # Pending, Drafting, Reviewing, Approved
            "output_path": None,
            "feedback": [],
            "created_at": datetime.now().isoformat()
        }
        self.state["tasks"].append(task)
        self.save_state()
        print(f"Added task: {name} (Assigned to: {agent})")

    def list_tasks(self):
        for t in self.state["tasks"]:
            print(f"[{t['id']}] {t['name']} - {t['agent']} ({t['status']})")

    def update_status(self, task_id, status, output_path=None, feedback=None):
        for t in self.state["tasks"]:
            if t["id"] == task_id:
                t["status"] = status
                if output_path:
                    t["output_path"] = output_path
                if feedback:
                    t["feedback"].append({
                        "from": "Reviewer",
                        "content": feedback,
                        "timestamp": datetime.now().isoformat()
                    })
                self.save_state()
                print(f"Updated Task {task_id} status to {status}")
                return
        print(f"Task {task_id} not found.")

def main():
    parser = argparse.ArgumentParser(description="CCMA Orchestrator")
    parser.add_argument("--add", nargs=3, metavar=("NAME", "AGENT", "DESC"), help="Add a new task")
    parser.add_argument("--list", action="store_true", help="List all tasks")
    parser.add_argument("--update", nargs=2, metavar=("ID", "STATUS"), help="Update task status")
    parser.add_argument("--output", nargs=2, metavar=("ID", "PATH"), help="Set output path for a task")
    parser.add_argument("--feedback", nargs=2, metavar=("ID", "MSG"), help="Add feedback to a task")

    args = parser.parse_args()
    
    # Assuming the script is in workflows/
    base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    orch = CCMAOrchestrator(base_path)

    if args.add:
        orch.add_task(args.add[0], args.add[1], args.add[2])
    elif args.list:
        orch.list_tasks()
    elif args.update:
        orch.update_status(int(args.update[0]), args.update[1])
    elif args.output:
        orch.update_status(int(args.output[0]), orch.state["tasks"][int(args.output[0])-1]["status"], output_path=args.output[1])
    elif args.feedback:
        orch.update_status(int(args.feedback[0]), "Reviewing", feedback=args.feedback[1])
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
