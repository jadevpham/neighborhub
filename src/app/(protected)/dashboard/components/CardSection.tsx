interface Props {
    title: string;
    children: React.ReactNode;
  }
  
  export default function CardSection({ title, children }: Props) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-5 h-80">
        <h3 className="font-semibold text-sm mb-3">{title}</h3>
        {children}
      </div>
    );
  }
  