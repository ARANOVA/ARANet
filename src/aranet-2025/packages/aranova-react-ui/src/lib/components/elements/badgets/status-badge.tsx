import { Badge } from "../../tw";

type enumStates = 'draft' | 'temp' | 'request' | 'approved' | 'deleted' | 'published' | 'sent' | 'canceled' | 'signed' | 'frozen';
const enumStates: string[] = ['draft', 'temp', 'request', 'approved', 'deleted', 'published', 'sent', 'canceled', 'signed', 'frozen'];

interface Props {
    state?: {
      value: string;
      suffix?: string;
    }
  }
 
export const StatusBagde = ({ state }: Props) => {
  if (state === undefined || !enumStates.includes(state.value)) {
    return null;
  }

  const colorMap: Record<enumStates, { color:
    | 'lime'
    | 'blue'
    | 'orange'
    | 'red'
    | 'zinc'
    | 'indigo'
    | 'cyan'
    | 'amber'
    | 'yellow'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'sky'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose'
    | undefined;
  label: string; 
}> = {
  approved: { color: "green", label: "Aprobado" },
  temp: { color: "blue", label: "Temporal" },
  request: { color: "violet", label: "Solicitud" },
  deleted: { color: "red", label: "Eliminado" },
  draft: { color: "amber", label: "Borrador" },
  published: { color: "teal", label: "Publicado" },
  sent: { color: "purple", label: "Registrado" },
  canceled: { color: "orange", label: "Cancelado" },
  signed: { color: "indigo", label: "Firmado" },
  frozen: { color: "cyan", label: "Congelado" },
};

  const badge = colorMap[state.value as enumStates];
  return (
    <>
      {badge && (
        <Badge color={badge.color}>
          {badge.label}{state.suffix ? ` ${state.suffix}` : ''}
        </Badge>
      )}
    </>
  );
};
