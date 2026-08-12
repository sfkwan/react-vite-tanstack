import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SpeakerForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      twitterHandle: "",
    },
    validatorAdapter: zodValidator(),

    onSubmit: async ({ value }) => {
      console.log("Form Submitted!", value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <form.Field
        name="firstName"
        validators={{
          onChange: z
            .string()
            .min(2, "First name must be at least 2 characters"),
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor={field.name} className="text-neutral-300">
              First Name
            </Label>

            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="bg-neutral-950 border-neutral-700 focus-visible:ring-emerald-500"
            />

            {field.state.meta.isTouched && field.state.meta.errors.length ? (
              <em className="text-red-500 text-xs">
                {field.state.meta.errors.map((error) => error.message)}
              </em>
            ) : null}
          </div>
        )}
      </form.Field>

      <button
        type="submit"
        className="w-full mt-4 bg-emerald-600 py-2 rounded-md font-bold"
      >
        Add Speaker
      </button>
    </form>
  );
}
