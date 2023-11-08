import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
export interface IOrgchartMsfProps {
  charttitle: string;
  topperson: IPropertyFieldGroupOrPerson[];
  searchfield: boolean;
  widedisplay: boolean;
  color: string;
  context: any;
  assistant: boolean;
  userfilter: string;
  rule1_type: string;
  rule1: string;
  rule1_bg: string;
  maxlevel: number
}
