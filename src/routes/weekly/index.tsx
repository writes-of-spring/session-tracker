import { revalidateLogic } from "@tanstack/react-form";
import { Link, createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { TooltipTrigger } from "react-aria-components";
import { z } from "zod";
import { useAppForm } from "@/components/form";
import { Button } from "@/components/ui/Button";
import { SelectItem } from "@/components/ui/Select";
import { Tooltip } from "@/components/ui/Tooltip";
import { weeklyEntry, weeklyEntrySchema } from "@/routes/weekly/-utils/weekly-entry";
import { downloadCsv, sanitizeFileSegment, toCsvRow } from "@/routes/weekly/-utils/weekly-utils";

const schema = z.object({
  therapistName: z.string().min(1, "Therapist name is required"),
  entries: z.array(weeklyEntrySchema).min(1, "At least one client is required"),
});

const modalityOptions = [
  { label: "ACT", value: "ACT" },
  { label: "CT/RT", value: "CT/RT" },
  { label: "CBT", value: "CBT" },
  { label: "DBT", value: "DBT" },
  { label: "IFS/Parts work", value: "IFS/Parts work" },
  { label: "Play therapy", value: "Play therapy" },
  { label: "Other", value: "other" },
] as const;

export const Route = createFileRoute("/weekly")({
  component: WeeklyReport,
});

function WeeklyReport() {
  const form = useAppForm({
    defaultValues: {
      therapistName: "",
      entries: [weeklyEntry],
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
    },
    onSubmit: ({ value }) => {
      const headers = [
        "firstName",
        "phone",
        "requiresReceipt",
        "email",
        "surname",
        "parentName",
        "feePaid",
        "numberOfSessions",
        "modalityUsed",
        "rationale",
        "noShow",
        "cancelled",
      ];
      const rows = value.entries.map((entry) =>
        toCsvRow([
          entry.firstName,
          entry.phone,
          entry.requiresReceipt,
          entry.email ?? "",
          entry.surname ?? "",
          entry.parentName ?? "",
          entry.feePaid,
          String(entry.numberOfSessions),
          entry.modalityUsed,
          entry.rationale,
          entry.noShow,
          entry.cancelled,
        ]),
      );
      const csvContent = [headers.join(","), ...rows].join("\n");
      const dateStamp = new Date().toISOString().slice(0, 10);
      const therapistSlug = sanitizeFileSegment(value.therapistName);
      downloadCsv(csvContent, `weekly-report-${dateStamp}-${therapistSlug}.csv`);
      form.reset();
    },
  });

  return (
    <div className="weekly-shell px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-6">
          <Link to="/" className="text-sm font-medium text-ink/60 hover:text-ink">
            Back to home
          </Link>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs tracking-widest text-ink/60 uppercase">Weekly report</p>
              <h1 className="mt-3 text-3xl font-semibold text-ink md:text-5xl">
                Record weekly client sessions
              </h1>
              <p className="mt-4 text-sm text-ink/70">
                Add each client entry, check receipts, and download a CSV copy to your device.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-10 space-y-6"
        >
          <section className="rounded-3xl border border-ink/5 bg-white/90 p-6 shadow-sm">
            <form.AppField name="therapistName">
              {(field) => (
                <field.TextField label="Therapist name" placeholder="Name used for the CSV file" />
              )}
            </form.AppField>
          </section>
          <form.AppField name="entries" mode="array">
            {(field) => (
              <div className="space-y-6">
                {field.state.value.map((_, index) => (
                  <section key={`entry-${index}`} className="entry-card">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs tracking-widest text-ink/60 uppercase">
                          Client {index + 1}
                        </p>
                        <h2 className="mt-2 text-xl font-semibold text-ink">Session details</h2>
                      </div>
                      <TooltipTrigger>
                        <Button
                          type="button"
                          variant="secondary"
                          onPress={() => field.removeValue(index)}
                          isDisabled={field.state.value.length === 1}
                          className="self-start text-ink/70"
                        >
                          <X className="size-4" />
                        </Button>
                        <Tooltip>Remove client entry</Tooltip>
                      </TooltipTrigger>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <form.AppField name={`entries[${index}].numberOfSessions`}>
                        {(field) => (
                          <field.NumberField
                            label="Number of sessions"
                            minValue={1}
                            step={1}
                            formatOptions={{
                              maximumFractionDigits: 0,
                              minimumFractionDigits: 0,
                            }}
                          />
                        )}
                      </form.AppField>
                      <form.AppField name={`entries[${index}].firstName`}>
                        {(field) => (
                          <field.TextField
                            label="Client first name"
                            placeholder="Client first name"
                          />
                        )}
                      </form.AppField>
                      <form.AppField name={`entries[${index}].phone`}>
                        {(field) => (
                          <field.TextField label="Phone number" placeholder="Client phone" />
                        )}
                      </form.AppField>
                      <form.AppField name={`entries[${index}].parentName`}>
                        {(field) => (
                          <field.TextField
                            label="Parent name"
                            placeholder="Parent or guardian name (optional)"
                          />
                        )}
                      </form.AppField>
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <form.AppField name={`entries[${index}].modalityUsed`}>
                        {(field) => (
                          <field.Select
                            label="Modality used"
                            description="If other please specify in rationale"
                            items={modalityOptions}
                          >
                            {modalityOptions.map((item) => (
                              <SelectItem key={item.value} id={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </field.Select>
                        )}
                      </form.AppField>
                    </div>

                    <div className="mt-4">
                      <form.AppField name={`entries[${index}].rationale`}>
                        {(field) => (
                          <field.TextArea label="Rationale" description="No identifying details" />
                        )}
                      </form.AppField>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3 md:items-center">
                      <form.AppField name={`entries[${index}].requiresReceipt`}>
                        {(field) => <field.CheckboxBoolean>Requires receipt</field.CheckboxBoolean>}
                      </form.AppField>
                      <form.AppField
                        name={`entries[${index}].noShow`}
                        listeners={{
                          onChange: ({ value, fieldApi }) => {
                            if (value) {
                              fieldApi.form.setFieldValue(`entries[${index}].cancelled`, false);
                            }
                          },
                        }}
                      >
                        {(field) => <field.CheckboxBoolean>No-show</field.CheckboxBoolean>}
                      </form.AppField>
                      <form.AppField
                        name={`entries[${index}].cancelled`}
                        listeners={{
                          onChange: ({ value, fieldApi }) => {
                            if (value) {
                              fieldApi.form.setFieldValue(`entries[${index}].noShow`, false);
                            }
                          },
                        }}
                      >
                        {(field) => <field.CheckboxBoolean>Cancelled</field.CheckboxBoolean>}
                      </form.AppField>
                    </div>

                    <form.Subscribe
                      selector={(state) => state.values.entries?.[index]?.requiresReceipt}
                    >
                      {(requiresReceipt) =>
                        requiresReceipt ? (
                          <div className="mt-4 grid items-baseline gap-4 md:grid-cols-3">
                            <form.AppField name={`entries[${index}].email`}>
                              {(field) => (
                                <field.TextField
                                  label="Receipt email"
                                  placeholder="client@email.com"
                                />
                              )}
                            </form.AppField>
                            <form.AppField name={`entries[${index}].surname`}>
                              {(field) => (
                                <field.TextField label="Surname" placeholder="Client surname" />
                              )}
                            </form.AppField>
                            <form.AppField name={`entries[${index}].feePaid`}>
                              {(field) => (
                                <field.NumberField
                                  label="Fee paid"
                                  description="Required for receipts"
                                  formatOptions={{
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }}
                                  minValue={0}
                                  step={0.01}
                                />
                              )}
                            </form.AppField>
                          </div>
                        ) : null
                      }
                    </form.Subscribe>
                  </section>
                ))}

                <Button
                  type="button"
                  variant="secondary"
                  onPress={() => field.pushValue({ ...weeklyEntry })}
                  className="w-full justify-center"
                >
                  Add another client
                </Button>
              </div>
            )}
          </form.AppField>

          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs tracking-widest text-ink/60 uppercase">
              CSV downloads to your device
            </p>
            <form.AppForm>
              <form.SubscribeButton label="Save weekly CSV" />
            </form.AppForm>
          </div>
        </form>
      </div>
    </div>
  );
}
