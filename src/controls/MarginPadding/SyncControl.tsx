import { InputCheckbox } from "../Input/InputCheckbox";
import { SyncedBox } from "../../properties/Box";

interface SyncControlProps {
    property: string;
    item: SyncedBox;
    syncCheckboxChange: Function;
}

export function SyncControl(props: SyncControlProps) {
    return (
        <>
            <div className="grid col-4 mb-2">
                <InputCheckbox disabled={props.item.syncAll} name={props.property} property="syncHorizontal" cols={[8, 4]} title="Sync horizontal" value={props.item.syncHorizontal} onCheckboxChange={props.syncCheckboxChange} />
            </div>
            <div className="grid col-4 mb-2">
                <InputCheckbox disabled={props.item.syncAll} name={props.property} property="syncVertical" cols={[8, 4]} title="Sync vertical" value={props.item.syncVertical} onCheckboxChange={props.syncCheckboxChange} />
            </div>
            <div className="grid col-4 mb-2">
                <InputCheckbox name={props.property} property="syncAll" cols={[8, 4]} title="Sync all" value={props.item.syncAll} onCheckboxChange={props.syncCheckboxChange} />
            </div>
        </>
    );
}
