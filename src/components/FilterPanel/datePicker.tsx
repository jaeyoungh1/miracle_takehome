import React from "react";

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface Props {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export const DatePicker = ({ value, onChange }: Props) => {
  const handleChange = (key: "start" | "end", dateStr: string) => {
    const newDate = dateStr ? new Date(dateStr) : null;
    onChange({ ...value, [key]: newDate });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        value={value.start ? value.start.toISOString().split("T")[0] : ""}
        onChange={(e) => handleChange("start", e.target.value)}
        className="border rounded px-2 py-1"
      />
      <span className="mx-1">to</span>
      <input
        type="date"
        value={value.end ? value.end.toISOString().split("T")[0] : ""}
        onChange={(e) => handleChange("end", e.target.value)}
        className="border rounded px-2 py-1"
      />
    </div>
  );
};
