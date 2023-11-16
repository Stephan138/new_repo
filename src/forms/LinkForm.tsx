import { useForm } from "react-hook-form";
import { Button } from "../components/Button";
import { Field } from "../components/Field";
import { Modal } from "../components/Modal";
import { Form } from "../components/Form";
import { TLinksForm } from "../api/models/link-model";
import {
  useCreateLink,
  useGetLink,
  useUpdateLink,
} from "../api/hooks/useLinks";
import { TUseModal } from "../hooks/useModal";
import { useEffect } from "react";

type Props = {
  state: TUseModal;
  parent: string;
  edit?: string;
  onUpdate?: () => void;
};

export const LinkForm: React.FC<Props> = ({
  state,
  parent,
  edit,
  onUpdate,
}) => {
  const { getLinkInfo, link } = useGetLink();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TLinksForm>({
    values: {
      description: link?.description || "",
      name: link?.name || "",
      url: link?.url || "",
    },
  });

  const { newLink } = useCreateLink(onUpdate);
  const { updateLink } = useUpdateLink(onUpdate);

  const onSubmit = (link: TLinksForm) => {
    !edit ? newLink({ parent, link }) : updateLink({ parent: edit, link });
    reset();
    state.close();
  };

  useEffect(() => {
    edit && getLinkInfo(edit);
  }, [edit]);

  return (
    <Modal
      isVisible={state.visible}
      onClose={state.close}
      title={edit ? "Редактировать ссылку" : "Новая ссылка"}
    >
      <Form
        gap={16}
        compact
        onSubmit={handleSubmit(onSubmit)}
        footer={<Button label={edit ? "Сохранить" : "Создать"} />}
      >
        <Field
          label="Название"
          error={errors.name?.message}
          {...register("name", { required: "Введите название" })}
        />
        <Field
          label="URL"
          error={errors.url?.message}
          {...register("url", { required: "Введите ссылку" })}
        />
        <Field
          label="Описание"
          error={errors.description?.message}
          {...register("description", { required: "Введите описание" })}
        />
      </Form>
    </Modal>
  );
};
