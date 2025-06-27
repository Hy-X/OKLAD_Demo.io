# OKLAD Dataset Schema

This document describes the structure and format of the OKLAD dataset.

## Overview

The OKLAD dataset is structured as a tabular dataset with multiple features and a target variable. The data is provided in multiple formats for maximum compatibility.

## Data Format

### CSV Format
The dataset is primarily distributed in CSV (Comma-Separated Values) format with UTF-8 encoding.

### JSON Format
For web applications and API integrations, the dataset is also available in JSON format.

### Parquet Format
For efficient storage and fast data processing, the dataset is available in Apache Parquet format.

## Schema Definition

### Column Descriptions

| Column Name | Data Type | Description | Example Values | Missing Values |
|-------------|-----------|-------------|----------------|----------------|
| `id` | Integer | Unique identifier for each sample | 1, 2, 3, ... | None |
| `feature_1` | Float | Primary numerical feature | 0.123, -1.456, 2.789 | 0.5% |
| `feature_2` | Float | Secondary numerical feature | 1.234, 0.567, -0.890 | 0.2% |
| `feature_3` | Categorical | Categorical feature with 5 classes | "A", "B", "C", "D", "E" | 1.0% |
| `feature_4` | Boolean | Binary feature | true, false | 0.0% |
| `feature_5` | String | Text feature (max 100 chars) | "sample text", "another example" | 2.1% |
| `target` | Integer | Target variable (0-4 classes) | 0, 1, 2, 3, 4 | None |

### Data Types

- **Integer**: Whole numbers (e.g., 1, -5, 1000)
- **Float**: Decimal numbers (e.g., 3.14, -0.001, 2.5e-3)
- **Categorical**: Discrete categories (e.g., "A", "B", "C")
- **Boolean**: True/false values
- **String**: Text data with maximum length constraints

### Missing Values

Missing values are represented as:
- `null` in JSON format
- Empty cells in CSV format
- `NaN` in Parquet format

## Data Quality

### Validation Rules

1. **ID Column**: Must be unique, non-null, sequential integers
2. **Feature_1**: Must be between -10.0 and 10.0
3. **Feature_2**: Must be between -5.0 and 5.0
4. **Feature_3**: Must be one of: "A", "B", "C", "D", "E"
5. **Feature_4**: Must be true or false
6. **Feature_5**: Must be string with length ≤ 100 characters
7. **Target**: Must be integer between 0 and 4

### Data Distribution

#### Target Variable Distribution
```
Class 0: 25.0% (2,500 samples)
Class 1: 22.5% (2,250 samples)
Class 2: 20.0% (2,000 samples)
Class 3: 17.5% (1,750 samples)
Class 4: 15.0% (1,500 samples)
```

#### Feature Statistics
```
Feature_1:
  - Mean: 0.123
  - Std: 1.456
  - Min: -9.876
  - Max: 9.543
  - Missing: 0.5%

Feature_2:
  - Mean: -0.234
  - Std: 0.789
  - Min: -4.987
  - Max: 4.123
  - Missing: 0.2%

Feature_3:
  - A: 20.0%
  - B: 22.0%
  - C: 19.0%
  - D: 21.0%
  - E: 18.0%
  - Missing: 1.0%
```

## File Structure

### Complete Dataset
```
oklad_dataset/
├── data/
│   ├── oklad_dataset.csv          # Main dataset (10,000 rows)
│   ├── oklad_dataset.json         # JSON format
│   └── oklad_dataset.parquet      # Parquet format
├── splits/
│   ├── train.csv                  # Training set (70%)
│   ├── validation.csv             # Validation set (15%)
│   └── test.csv                   # Test set (15%)
└── metadata/
    ├── schema.json                # JSON schema definition
    └── statistics.json            # Statistical summary
```

### Split Information

The dataset is pre-split into training, validation, and test sets:

- **Training Set**: 7,000 samples (70%)
- **Validation Set**: 1,500 samples (15%)
- **Test Set**: 1,500 samples (15%)

Splits are stratified to maintain class distribution across all sets.

## Usage Examples

### Python (Pandas)
```python
import pandas as pd

# Load the dataset
df = pd.read_csv('oklad_dataset.csv')

# Check data types
print(df.dtypes)

# Check for missing values
print(df.isnull().sum())

# Basic statistics
print(df.describe())
```

### R
```r
# Load the dataset
data <- read.csv("oklad_dataset.csv")

# Check structure
str(data)

# Check for missing values
colSums(is.na(data))

# Summary statistics
summary(data)
```

### JavaScript (Node.js)
```javascript
const fs = require('fs');

// Load JSON dataset
const data = JSON.parse(fs.readFileSync('oklad_dataset.json', 'utf8'));

// Check structure
console.log('Number of samples:', data.length);
console.log('Features:', Object.keys(data[0]));
```

## Version History

### Version 1.0 (Current)
- Initial release
- 10,000 samples
- 6 features + 1 target
- Multiple format support

### Planned Updates
- Version 1.1: Additional features
- Version 2.0: Expanded dataset size
- Version 2.1: Additional data sources

## Citation

When using this dataset, please cite:

```bibtex
@dataset{oklad_dataset,
  title={OKLAD Dataset: A Comprehensive Dataset for Research},
  author={[Your Name]},
  year={2024},
  version={1.0},
  url={https://github.com/yourusername/OKLAD_Github_Page}
}
```

## License

This dataset is released under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## Contact

For questions about the dataset schema or to report issues:
- Create an issue in the GitHub repository
- Contact: [your-email@example.com] 