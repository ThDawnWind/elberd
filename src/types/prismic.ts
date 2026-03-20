import type {
  KeyTextField,
  NumberField,
  BooleanField,
  ImageField,
  SelectField,
} from "@prismicio/client";

export type PrismicProduct = {
  id: string;
  uid: string;
  data: {
    name: KeyTextField;
    price: NumberField;
    weight: KeyTextField;
    rating?: NumberField;
    category: SelectField<
      | "meat"
      | "holiday"
      | "fish"
      | "semi-finished"
      | "ready-meals"
      | "bakery "
      | "preserves"
    >;
    content?: KeyTextField;
    shelf_life?: KeyTextField;
    image?: ImageField;
      gallery_image?: {
      images?: ImageField;
    }[];
    is_new?: BooleanField;
    is_hit?: BooleanField;
    is_popular?: BooleanField;
    is_recommend?: BooleanField;
  };
};
