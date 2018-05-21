import {environment} from "../../environments/environment";

export class Course {
	id: number;
	title: string;
	class_id: number;
	subject_id: number;
	sub_title: string;
	description: string;
	language: string;
	status: string;
	is_test: boolean;
	tools_required: string;
	who_can_take: string;
	achivement: string;
	image: string;
	promo_video: string;
	discount_price: number;
	price: number;
	welcome_message: string;
	congratulation_message: string;
	price_currency: string;
	privacy: string;
	google_adwards: string;
	google_tracking_id: string;
}