import AddModule from "@/components/forms/AddModule";

export default function ModulesPage() {
  return (
    <div className="w-full min-h-screen px-10">
      <div className="flex flex-col space-y-4 mt-10">
        <div className="w-full flex justify-end">
          <AddModule />
        </div>
      </div>
    </div>
  );
}
