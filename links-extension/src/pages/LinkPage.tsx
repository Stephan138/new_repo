import { Link, useParams } from "react-router-dom";
import { useLinks } from "../api/hooks/useLinks";
import { Content } from "../layouts";

export const LinkPage = () => {
  const { id } = useParams();
  const { link } = useLinks(id);

  return (
    <Content layout>
      <p>{link?.name}</p>
      <p>Нажмите на ссылку ниже чтобы перейти:</p>
      {link && (
        <Link to={link.url} target="__blank">
          Перейти
        </Link>
      )}
    </Content>
  );
};
