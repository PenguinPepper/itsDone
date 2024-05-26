export const formatDate = (data) => {
    const month = data.toLocalString("en-US", { month: "short" });
    const day = data.getDate();
    const year = data.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
};

export function dateFormatter(dateString) {
    const inputDate = new Date(dateString);

    if (isNaN(inputDate)) {
        return "Invali Date";
    }

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function getInitials(fullName) {
    const names = fullName.split(' ');
    const initials = names.slice(0, 2).map(name => name.charAt(0).toUpperCase());
    return initials.join('');
}

export const PRIOTITYSTYELS = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-blue-600'
}

export const TASK_TYPE = {
    todo: "bg-blue-600",
    inprogress: "bg-yellow-600",
    completed: "bg-green-600"
}

export const BGS = [
    "bg-blue-600",
    "bg-yellow-600",
    "bg-red-600",
    "bg-green-600",
]