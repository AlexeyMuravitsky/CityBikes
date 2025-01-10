import "./ListItem.scss";

interface ListItemProps {
  name: string;
  descr?: string;
  onClick?: () => void;
  className?: string;
  icon?: JSX.Element;
}

const ListItem = ({ name, descr, onClick, className, icon }: ListItemProps) => {
  return (
    <div onClick={onClick} className={`list-item ${className}`}>
      <div>
        {name} {descr && `(${descr})`}
      </div>
      <div>{icon}</div>
    </div>
  );
};

export default ListItem;
