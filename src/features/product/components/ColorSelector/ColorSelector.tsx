import styles from "./ColorSelector.module.scss";

interface Props {
  selectedColor: string;
  onSelect: (color: string) => void;
}

const colors = [
  {
    label: "Black",
    hex: "#000",
  },
  {
    label: "Blue",
    hex: "#2563eb",
  },
   {
    label: "Green",
    hex: "#25eb4d",
  },
];

export default function ColorSelector({
  selectedColor,
  onSelect,
}: Props) {
  return (
    <div>
      <h3>Color</h3>

      <div className={styles.colors}>
        {colors.map((color) => (
          <div
  key={color.label}
  className={styles.colorWrapper}
>
  <button
    onClick={() =>
      onSelect(color.label)
    }
    className={
      selectedColor === color.label
        ? styles.active
        : ""
    }
    style={{
      background: color.hex,
    }}
  />

  <span>{color.label}</span>
</div>
        ))}
      </div>
    </div>
  );
}