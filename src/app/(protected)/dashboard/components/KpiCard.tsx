interface Props {
    title: string;
    value: number;
    subtitle?: string;
  }
  
  export default function KpiCard({ title, value, subtitle }: Props) {
    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border">
        <p className="text-xs font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-semibold">
          {value.toLocaleString()}
        </p>
        {subtitle && (
          <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
        )}
      </div>
    );
  }
  