type getDeltaProps = {
  mode: string;
  input1: any;
  input2: any;
};

export function getDelta({ mode, input1, input2 }: getDeltaProps) {
  if (mode.toLowerCase() === "date") {
    const date1 = Date.parse(input1);
    const date2 = Date.parse(input2);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Math.abs(date1 - date2);

    // Convert the difference to seconds
    const differenceInSeconds = differenceInMilliseconds / 1000;

    return differenceInSeconds;
  }
}
