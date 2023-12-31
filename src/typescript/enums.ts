export enum E_Order_Status {
  delivered = "Delivered",
  declined = "Declined",
  in_state_of_residence = "In state",
  on_transit = "On Transit",
  processing = "Processing",
}

export enum E_Order_Remark {
  paid = "Paid",
  processing_refund = "Processing Refund",
  refunded = "Refunded",
}

export enum E_Roles {
  admin = "admin",
  super_admin = "super_admin",
  user = "user",
  potential_admin = "potential_admin",
}
