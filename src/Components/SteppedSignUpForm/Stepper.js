export const Stepper = ({array, currentStep}) => {
   return <ul className="stepper">
        {array.map(({props},index) => {
            return <li key={index} className={index <= currentStep ? "currentStep" : ""}>{props.label}</li>
        })}
   </ul>
}