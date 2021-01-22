export interface PostDelivery {
  from: string;
  details: PosDeliveryDetail[];
}

export interface PosDeliveryDetail {
  to: string;
  room_destination: string;
  itemName: string;
  itemNote: string;
}

export interface DeliveryHistory {
  id: string;
  create_at: string;
  from: string;
  details: DeliveryHistoryDetail[];
}

export interface DeliveryHistoryDetail {
  id: string;
  delivery_id: string;
  to: string;
  room_destination: string;
  status: string;
  itemName: string;
  itemNote: string;
  created_at: string;
}
