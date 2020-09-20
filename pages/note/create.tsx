import EditNote from "../../components/create-note/CreateNote";
import { TodoForm } from "../../interfaces";
import { observer } from "mobx-react-lite";
import { NotesStore } from "../../mobx/NotesStore";

const NewNote = observer(({ notesStore }: { notesStore: NotesStore }) => {
  const isNotesFull = notesStore.isNotesFull;

  const handleSave = async ({
    title,
    todos,
  }: {
    title: string;
    todos: TodoForm[];
  }) => {
    const newNote = { title, todos };
    try {
      debugger;
      await notesStore.addNote(title, todos);
    } catch (error) {
      console.log(error);
      // setError(error.data.msg);
    }
  };

  return (
    <>
      {!isNotesFull ? (
        <EditNote handleSave={handleSave}></EditNote>
      ) : (
        <div>You have reached the maximum amount of notes</div>
      )}
    </>
  );
});

export default NewNote;
