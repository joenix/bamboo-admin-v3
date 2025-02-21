import { NumberInput, SelectInput, required } from "@/utils/dep";
import { useDataProvider } from "react-admin";
import { useState, useEffect } from "react";
export default function FormCore() {
  const dataProvider = useDataProvider();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    dataProvider
      .getList("Book", {})
      .then(({ data }) => {
        setBooks(data);
      })
      .catch(() => {
        setBooks([]);
      });
  }, []);

  return (
    <>
      <div className="viewContainer">
        <div className="title">图书名称:</div>
        <SelectInput
          source="bookId"
          choices={books}
          label={false}
          validate={[required("请选择图书")]}
          variant="outlined"
        />
      </div>
      <div className="viewContainer">
        <div className="title">发放数量:</div>
        <NumberInput
          source="count"
          label={false}
          validate={[required("请输入发放数量")]}
          min={1}
          variant="outlined"
        />
      </div>
    </>
  );
}
