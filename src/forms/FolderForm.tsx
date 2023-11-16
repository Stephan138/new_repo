import { useForm } from "react-hook-form";

import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Modal } from "../components/Modal";
import { Form } from "../components/Form";
import { TFolderForm } from "../api/models/folders-model";
import { TUseModal } from "../hooks/useModal";
import { useCreateFolder, useRenameFolder } from "../api/hooks/useFolder";

type Props = {
  state: TUseModal;
  parent: string;
  edit?: string;
  name?: string;
  onUpdate?: () => void;
};

export const FolderForm: React.FC<Props> = ({
  state,
  parent,
  edit,
  name,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TFolderForm>({
    values: {
      parentId: edit || parent,
      name: name || "",
    },
  });
  const { newFolder } = useCreateFolder(onUpdate);
  const { updateFolder } = useRenameFolder(onUpdate);

  const onCreateFolder = (data: TFolderForm) => {
    !edit ? newFolder(data) : updateFolder(data);
    reset();
    state.close();
  };

  return (
    <Modal
      isVisible={state.visible}
      onClose={state.close}
      title={edit ? "Переименовать папку" : "Новая папка"}
    >
      <Form compact onSubmit={handleSubmit(onCreateFolder)}>
        <Field
          error={errors.name?.message}
          {...register("name", { required: "Имя папки обязательно" })}
        />
        <Button label={edit ? "Обновить" : "Сохранить"} />
      </Form>
    </Modal>
  );
};
