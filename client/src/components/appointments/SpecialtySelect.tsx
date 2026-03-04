import SelectField from "@/components/ui/SelectField";

interface Speciality {
  id_especialidad: number;
  nombre_especialidad: string;
}

type Props = {
  specialities: Speciality[];
  selectedSpecialty: number | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SpecialtySelect({specialities,selectedSpecialty,onChange,}: Props) {
  return (
    <SelectField
      label="Especialidad"
      value={selectedSpecialty ?? ""}
      onChange={onChange}
    >
      <option value="" disabled>
        Selecciona especialidad...
      </option>

      {specialities.map((s) => (
        <option key={s.id_especialidad} value={s.id_especialidad}>
          {s.nombre_especialidad}
        </option>
      ))}
    </SelectField>
  );
}

export default SpecialtySelect;