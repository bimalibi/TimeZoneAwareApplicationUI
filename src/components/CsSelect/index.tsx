import { Select } from "antd";
import { DefaultOptionType, SelectProps } from "antd/es/select";
interface ISelectProp extends SelectProps {
  onChange?:
    | ((value: string, option: DefaultOptionType | DefaultOptionType[]) => void)
    | undefined;
  isLoading?: boolean;
  options: DefaultOptionType[];
  placeholder: string;
  mode?: "multiple" | "tags";
  value?: any;
}
const CsSelect = ({
  onChange,
  isLoading,
  options,
  placeholder,
  mode,
  value,
  ...rest
}: ISelectProp) => {
  return (
    <div>
      <Select
        style={{ width: "8rem" }}
        onChange={onChange}
        loading={isLoading}
        placeholder={placeholder}
        options={options}
        allowClear
        mode={mode}
        value={value}
        // defaultValue={defaultValue}
        {...rest}
      />
    </div>
  );
};

export default CsSelect;
