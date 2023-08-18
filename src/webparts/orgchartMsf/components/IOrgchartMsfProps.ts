import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
export interface IOrgchartMsfProps {
  charttitle: string;
  topperson: IPropertyFieldGroupOrPerson[];
  searchfield: boolean;
  widedisplay: boolean;
  color: string;
  context: any
}
