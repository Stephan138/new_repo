import { useMutation, useQuery } from "react-query";
import { createLink, editLink, getLink } from "../services/links-service";
import { TLinksForm } from "../models/link-model";

export const useLinks = (id?: string) => {
  const { data: link } = useQuery(["link", id], () => getLink(id!), {
    enabled: !!id,
  });

  return { link };
};

export const useGetLink = () => {
  const { data: link, mutate: getLinkInfo } = useMutation((id: string) =>
    getLink(id)
  );

  return { link, getLinkInfo };
};

export const useCreateLink = (onUpdate?: () => void) => {
  const { mutate: newLink } = useMutation(
    ({ parent, link }: { parent: string; link: TLinksForm }) =>
      createLink(parent, link),
    { onSuccess: onUpdate }
  );
  return { newLink };
};

export const useUpdateLink = (onUpdate?: () => void) => {
  const { mutate: updateLink } = useMutation(
    ({ parent, link }: { parent: string; link: TLinksForm }) =>
      editLink(parent, link),
    { onSuccess: onUpdate }
  );
  return { updateLink };
};
