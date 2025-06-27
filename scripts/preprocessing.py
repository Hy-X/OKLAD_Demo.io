#!/usr/bin/env python3
"""
OKLAD Dataset Preprocessing Script

This script demonstrates how to preprocess the OKLAD dataset for machine learning tasks.
It includes data cleaning, feature engineering, and preparation for model training.

Author: [Your Name]
Date: 2024
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.impute import SimpleImputer
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
warnings.filterwarnings('ignore')

class OKLADPreprocessor:
    """
    A class for preprocessing the OKLAD dataset.
    """
    
    def __init__(self, data_path='../data/oklad_dataset.csv'):
        """
        Initialize the preprocessor.
        
        Args:
            data_path (str): Path to the dataset file
        """
        self.data_path = data_path
        self.data = None
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.imputer = SimpleImputer(strategy='mean')
        
    def load_data(self):
        """
        Load the dataset from file.
        
        Returns:
            pd.DataFrame: Loaded dataset
        """
        try:
            self.data = pd.read_csv(self.data_path)
            print(f"Dataset loaded successfully: {self.data.shape[0]} samples, {self.data.shape[1]} features")
            return self.data
        except FileNotFoundError:
            print(f"Error: Dataset file not found at {self.data_path}")
            return None
        except Exception as e:
            print(f"Error loading dataset: {e}")
            return None
    
    def explore_data(self):
        """
        Perform exploratory data analysis.
        """
        if self.data is None:
            print("No data loaded. Please load data first.")
            return
        
        print("\n=== Dataset Overview ===")
        print(f"Shape: {self.data.shape}")
        print(f"Memory usage: {self.data.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
        
        print("\n=== Data Types ===")
        print(self.data.dtypes)
        
        print("\n=== Missing Values ===")
        missing_data = self.data.isnull().sum()
        missing_percent = (missing_data / len(self.data)) * 100
        missing_df = pd.DataFrame({
            'Missing Values': missing_data,
            'Percentage': missing_percent
        })
        print(missing_df[missing_df['Missing Values'] > 0])
        
        print("\n=== Target Distribution ===")
        target_counts = self.data['target'].value_counts().sort_index()
        print(target_counts)
        print(f"Class balance: {target_counts.min() / target_counts.max():.3f}")
        
        # Create visualizations
        self._create_visualizations()
    
    def _create_visualizations(self):
        """
        Create exploratory visualizations.
        """
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        
        # Target distribution
        axes[0, 0].bar(self.data['target'].value_counts().index, 
                      self.data['target'].value_counts().values)
        axes[0, 0].set_title('Target Distribution')
        axes[0, 0].set_xlabel('Target Class')
        axes[0, 0].set_ylabel('Count')
        
        # Feature distributions
        for i, feature in enumerate(['feature_1', 'feature_2']):
            row, col = (i + 1) // 2, (i + 1) % 2
            axes[row, col].hist(self.data[feature].dropna(), bins=30, alpha=0.7)
            axes[row, col].set_title(f'{feature} Distribution')
            axes[row, col].set_xlabel(feature)
            axes[row, col].set_ylabel('Frequency')
        
        # Correlation heatmap
        numeric_cols = self.data.select_dtypes(include=[np.number]).columns
        correlation_matrix = self.data[numeric_cols].corr()
        sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', 
                   center=0, ax=axes[1, 1])
        axes[1, 1].set_title('Correlation Matrix')
        
        plt.tight_layout()
        plt.savefig('../docs/exploratory_analysis.png', dpi=300, bbox_inches='tight')
        plt.show()
    
    def clean_data(self):
        """
        Clean the dataset by handling missing values and outliers.
        
        Returns:
            pd.DataFrame: Cleaned dataset
        """
        if self.data is None:
            print("No data loaded. Please load data first.")
            return None
        
        print("\n=== Data Cleaning ===")
        
        # Handle missing values
        print("Handling missing values...")
        
        # For numerical features, use mean imputation
        numerical_features = ['feature_1', 'feature_2']
        for feature in numerical_features:
            if self.data[feature].isnull().sum() > 0:
                mean_value = self.data[feature].mean()
                self.data[feature].fillna(mean_value, inplace=True)
                print(f"  - Filled {feature} missing values with mean: {mean_value:.3f}")
        
        # For categorical features, use mode imputation
        categorical_features = ['feature_3']
        for feature in categorical_features:
            if self.data[feature].isnull().sum() > 0:
                mode_value = self.data[feature].mode()[0]
                self.data[feature].fillna(mode_value, inplace=True)
                print(f"  - Filled {feature} missing values with mode: {mode_value}")
        
        # For string features, use empty string
        string_features = ['feature_5']
        for feature in string_features:
            if self.data[feature].isnull().sum() > 0:
                self.data[feature].fillna('', inplace=True)
                print(f"  - Filled {feature} missing values with empty string")
        
        # Handle outliers using IQR method
        print("Handling outliers...")
        for feature in numerical_features:
            Q1 = self.data[feature].quantile(0.25)
            Q3 = self.data[feature].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            outliers = self.data[(self.data[feature] < lower_bound) | 
                                (self.data[feature] > upper_bound)]
            if len(outliers) > 0:
                print(f"  - {feature}: {len(outliers)} outliers detected")
                # Cap outliers instead of removing them
                self.data[feature] = np.clip(self.data[feature], lower_bound, upper_bound)
                print(f"    Capped outliers to range [{lower_bound:.3f}, {upper_bound:.3f}]")
        
        print("Data cleaning completed!")
        return self.data
    
    def engineer_features(self):
        """
        Create new features from existing ones.
        
        Returns:
            pd.DataFrame: Dataset with engineered features
        """
        if self.data is None:
            print("No data loaded. Please load data first.")
            return None
        
        print("\n=== Feature Engineering ===")
        
        # Create interaction features
        self.data['feature_1_squared'] = self.data['feature_1'] ** 2
        self.data['feature_2_squared'] = self.data['feature_2'] ** 2
        self.data['feature_1_2_interaction'] = self.data['feature_1'] * self.data['feature_2']
        
        print("  - Created squared features: feature_1_squared, feature_2_squared")
        print("  - Created interaction feature: feature_1_2_interaction")
        
        # Create text-based features
        if 'feature_5' in self.data.columns:
            self.data['text_length'] = self.data['feature_5'].str.len()
            self.data['word_count'] = self.data['feature_5'].str.split().str.len()
            self.data['word_count'] = self.data['word_count'].fillna(0)
            
            print("  - Created text features: text_length, word_count")
        
        # Create categorical encodings
        if 'feature_3' in self.data.columns:
            # One-hot encoding
            feature_3_dummies = pd.get_dummies(self.data['feature_3'], prefix='feature_3')
            self.data = pd.concat([self.data, feature_3_dummies], axis=1)
            
            # Label encoding
            self.data['feature_3_encoded'] = self.label_encoder.fit_transform(self.data['feature_3'])
            
            print("  - Created categorical encodings: one-hot and label encoding")
        
        print("Feature engineering completed!")
        return self.data
    
    def prepare_for_training(self, test_size=0.2, random_state=42):
        """
        Prepare the dataset for machine learning training.
        
        Args:
            test_size (float): Proportion of data for testing
            random_state (int): Random seed for reproducibility
            
        Returns:
            tuple: (X_train, X_test, y_train, y_test, feature_names)
        """
        if self.data is None:
            print("No data loaded. Please load data first.")
            return None
        
        print("\n=== Preparing for Training ===")
        
        # Select features for training
        feature_columns = [col for col in self.data.columns 
                          if col not in ['id', 'target'] and not col.startswith('feature_3_')]
        
        # Add back one-hot encoded features
        feature_columns.extend([col for col in self.data.columns 
                              if col.startswith('feature_3_')])
        
        X = self.data[feature_columns]
        y = self.data['target']
        
        print(f"Selected {len(feature_columns)} features for training")
        print(f"Feature names: {feature_columns}")
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state, stratify=y
        )
        
        print(f"Training set: {X_train.shape[0]} samples")
        print(f"Test set: {X_test.shape[0]} samples")
        
        # Scale numerical features
        numerical_features = [col for col in feature_columns 
                            if self.data[col].dtype in ['int64', 'float64']]
        
        if numerical_features:
            X_train[numerical_features] = self.scaler.fit_transform(X_train[numerical_features])
            X_test[numerical_features] = self.scaler.transform(X_test[numerical_features])
            print(f"Scaled {len(numerical_features)} numerical features")
        
        return X_train, X_test, y_train, y_test, feature_columns
    
    def save_processed_data(self, output_path='../data/processed/'):
        """
        Save the processed dataset.
        
        Args:
            output_path (str): Directory to save processed data
        """
        import os
        
        if self.data is None:
            print("No data loaded. Please load data first.")
            return
        
        os.makedirs(output_path, exist_ok=True)
        
        # Save processed dataset
        self.data.to_csv(f'{output_path}oklad_processed.csv', index=False)
        print(f"Processed dataset saved to {output_path}oklad_processed.csv")
        
        # Save preprocessing objects
        import joblib
        joblib.dump(self.scaler, f'{output_path}scaler.pkl')
        joblib.dump(self.label_encoder, f'{output_path}label_encoder.pkl')
        print(f"Preprocessing objects saved to {output_path}")

def main():
    """
    Main function to demonstrate the preprocessing pipeline.
    """
    print("OKLAD Dataset Preprocessing Pipeline")
    print("=" * 50)
    
    # Initialize preprocessor
    preprocessor = OKLADPreprocessor()
    
    # Load data
    data = preprocessor.load_data()
    if data is None:
        return
    
    # Explore data
    preprocessor.explore_data()
    
    # Clean data
    cleaned_data = preprocessor.clean_data()
    
    # Engineer features
    engineered_data = preprocessor.engineer_features()
    
    # Prepare for training
    X_train, X_test, y_train, y_test, feature_names = preprocessor.prepare_for_training()
    
    if X_train is not None:
        print(f"\nFinal dataset shape: {X_train.shape[0] + X_test.shape[0]} samples, {len(feature_names)} features")
        print("Dataset is ready for machine learning training!")
        
        # Save processed data
        preprocessor.save_processed_data()

if __name__ == "__main__":
    main() 