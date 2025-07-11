const StatusComponent = ({ status, className }) => {
    className = className ?? '';
    status = status ?? 'Draft'
    switch (status) {
        case 'Draft':
            className += 'bg-yellow-100 text-yellow-600';
            break;
        case 'Scheduled':
            className += 'bg-blue-100 text-blue-600';
            break;
        case 'Published':
            className += 'bg-green-100 text-green-600';
            break;
        default:
            className += 'bg-gray-100 text-gray-600';
    }

    return (
        <div className={`bg-opacity-75 px-2 py-1 self-center rounded-lg w-max h-max text-base ${className}`}>
            {status}
        </div>
    );
};


export default StatusComponent;