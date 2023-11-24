import csv
import pandas as pd

# Input file path
input_file = "D:/sample 2/Dynamic_data_06_10.csv"

# Output file path
output_file = "D:/sample 2/NewWellDynamicNullValues.csv"

# Function to replace empty fields with "null"
def replace_empty_with_null(row):
    for i in range(len(row)):
        if row[i] == '' and header[i] in ['GAS_RATE(mscum d)', 'WATER_RATE(KLPD)', 'OIL_RATE(KLPD)']:
            row[i] = 0
    return row

try:
    # Open the input CSV file for reading
    with open(input_file, mode='r') as infile:
        reader = csv.reader(infile)
        
        # Read the header row
        header = next(reader)

        # Create a new output file for writing
        with open(output_file, mode='w', newline='') as outfile:
            writer = csv.writer(outfile)

            # Write the header row to the output file
            writer.writerow(header)

            # Process each row in the input file and write to the output file
            for row in reader:
                new_row = replace_empty_with_null(row)
                writer.writerow(new_row)

    print("Empty fields in 'gas_rate', 'oil_rate', and 'water_rate' columns filled with 'null.")

    # Read the CSV file into a DataFrame
    df = pd.read_csv(output_file)

    # Extract the date part from the "Year_month" column
    df['MONTH'] = pd.to_datetime(df['Year_month']).dt.date

    # Save the updated DataFrame to the same output file
    df.to_csv(output_file, index=False)

    print("Date part extracted from 'Year_month' column and saved to 'MONTH' column.")

except Exception as e:
    print(f"An error occurred: {str(e)}")
