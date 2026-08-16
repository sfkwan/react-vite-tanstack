import { useParams } from "react-router-dom";
import { useGetNoteById } from "./api/notes/projectExample";

export default function NotesPage() {
  const { id } = useParams();
  const noteId = id ?? "";
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetNoteById(noteId, {
    query: { enabled: !!id },
  });

  const note =
    response?.status === 200 && "id" in response.data ? response.data : null;

  if (!id) {
    return <div>Missing note id.</div>;
  }

  if (isLoading) {
    return <div>Loading note...</div>;
  }

  if (isError) {
    return (
      <div>
        <h1>Note Details</h1>
        <p>Failed to load note.</p>
        <p>{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div>
        <h1>Note Details</h1>
        <p>Note not found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Note Details</h1>
      <p>ID: {note.id}</p>
      <p>Text: {note.text}</p>
      <p>Folder ID: {note.folderId}</p>
    </div>
  );
}
