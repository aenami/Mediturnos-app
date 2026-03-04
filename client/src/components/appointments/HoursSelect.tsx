import SelectField from "@/components/ui/SelectField";

type Props = {
  availableHours: string[];
  selectedHour: string | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function HourSelect({
  availableHours,
  selectedHour,
  onChange,
}: Props) {
  if (availableHours.length === 0) {
    return (
      <p className="text-sm text-red-500">
        No hay horarios disponibles para este día.
      </p>
    );
  }

  return (
    <SelectField
      label="Horario"
      value={selectedHour ?? ""}
      onChange={onChange}
    >
      <option value="" disabled>
        Selecciona horario...
      </option>

      {availableHours.map((hour) => (
        <option key={hour} value={hour}>
          {hour}
        </option>
      ))}
    </SelectField>
  );
}

export default HourSelect;