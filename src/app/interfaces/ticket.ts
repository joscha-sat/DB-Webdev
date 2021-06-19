export interface Ticket {
  ticket_id?: any;

  user_id: number;

  movie_name: string;
  date_of_show: Date;
  time_of_Show: string;

  seat_row: string;
  seat_number: number;

  snack_name: string;
  snack_size: string;
  snack_price: number;

  drink_name: string;
  drink_size: string;
  drink_price: number;

  room: number;

  total_price: number;
}
