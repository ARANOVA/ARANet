import { NotificationAlert } from "../../elements";

export const NotAuthorized = () => {
  return (
    <div className="m-8 flex flex-1">
      <NotificationAlert
        type="warning"
        title="No autorizado"
        text="No estás autorizado para ver esta página. Por favor, inicia sesión."
      />
    </div>
  );
};
