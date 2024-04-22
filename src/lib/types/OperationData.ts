export type OperationData = {
  created_at: string;
  actioned_by: { email: string; id: number; name: string; role: string };
  id: number;
  message: {
    created_at: string;
    created_by: number;
    id: number;
    item: {
      id: number;
      name: string;
    };
    item_id: number;
    message: string | null;
    player: {
      id: number;
      name: string;
    };
    player_id: number;
    status: string;
    type: string;
  };
};
