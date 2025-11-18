import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";
import SplitText from "../../SplitText/SplitText";
import TextType from "../../TextType/TextType";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
         <SplitText text={["WELCOME TO "," NOTEBOARD."]} className="text-2xl text-success font-extrabold"/>
      <div className="bg-success/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-success" />
      </div>
      {/* <SplitText text={"No notes yet"} className="text-xl text-success font-extrabold "/> */}
      <TextType text={["Ready to organize your thoughts?", "Create your first note to get started on your journey."]} className="text-2xl text-success font-extrabold"/>
      <Link to="/create" className="btn btn-outline btn-success">
        Create Your First Note
      </Link>
    </div>
  );
};
export default NotesNotFound;   