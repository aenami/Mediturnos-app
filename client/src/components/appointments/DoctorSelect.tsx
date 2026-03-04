import SelectField from "@/components/ui/SelectField";

interface Doctor {
  id_doctor: number;
  nombre_doctor: string;
  apellidos_doctor: string;
}

type Props = {
  doctors: Doctor[];
  selectedDoctor: number | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
};

function DoctorSelect({
  doctors,
  selectedDoctor,
  onChange,
  disabled = false,
}: Props) {
  return (
    <SelectField
      label="Doctor"
      value={selectedDoctor ?? ""}
      onChange={onChange}
      disabled={disabled}
    >
      <option value="" disabled>
        Selecciona doctor...
      </option>

      {doctors.map((doc) => (
        <option key={doc.id_doctor} value={doc.id_doctor}>
          {doc.nombre_doctor} {doc.apellidos_doctor}
        </option>
      ))}
    </SelectField>
  );
}

export default DoctorSelect;