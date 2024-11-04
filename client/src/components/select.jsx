import React from 'react';

// Select principal
const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})
Select.displayName = 'Select';

// Elemento para mostrar el Select (trigger)
const SelectTrigger = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className="relative cursor-pointer">
      <span className="text-gray-700">{children}</span>
    </div>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

// Contenedor de los elementos del Select
const SelectContent = ({ children }) => {
  return (
    <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      {children}
    </div>
  );
};

// Elemento individual de opción del Select
const SelectItem = React.forwardRef((props, ref) => {
  return (
    <option ref={ref} className="px-3 py-2 hover:bg-blue-100" {...props} />
  );
});
SelectItem.displayName = 'SelectItem';

// Elemento para mostrar el valor seleccionado del Select
const SelectValue = React.forwardRef((props, ref) => {
  return (
    <span ref={ref} {...props} className="text-gray-700" />
  );
});
SelectValue.displayName = 'SelectValue';

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
