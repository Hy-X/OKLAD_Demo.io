import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# Prevent plots from showing up in X11
import matplotlib
matplotlib.use('Agg')

# Create directory if it doesn't exist
os.makedirs('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots', exist_ok=True)

# Generate synthetic earthquake metadata
np.random.seed(42)
num_events = 50000

# Generate dates with an increase in events around 2014-2016 (induced seismicity peak in OK)
dates = []
for i in range(num_events):
    year = int(np.random.choice(
        [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        p=[0.01, 0.02, 0.03, 0.05, 0.15, 0.25, 0.20, 0.10, 0.07, 0.04, 0.03, 0.02, 0.01, 0.01, 0.01]
    ))
    month = int(np.random.randint(1, 13))
    day = int(np.random.randint(1, 28))
    dates.append(datetime(year, month, day))

df = pd.DataFrame({'timestamp': dates})

# Generate magnitudes (Gutenberg-Richter-like)
magnitudes = np.random.exponential(scale=0.5, size=num_events) + 1.0
df['magnitude'] = np.clip(magnitudes, 1.0, 5.8)

# Generate depths (mostly shallow for induced seismicity)
df['depth'] = np.random.gamma(shape=2.0, scale=2.5, size=num_events)
df['depth'] = np.clip(df['depth'], 0.5, 20.0)

# Generate stations
stations = ['OK01', 'OK02', 'OK03', 'OK04', 'OK05', 'OK06', 'OK07', 'OK08']
df['station'] = np.random.choice(stations, size=num_events, p=[0.2, 0.15, 0.15, 0.1, 0.1, 0.1, 0.1, 0.1])

# Generate networks
networks = ['OK', 'US', 'N4', 'GS']
df['network'] = np.random.choice(networks, size=num_events, p=[0.6, 0.2, 0.1, 0.1])

# Generate channels
channels = ['HNZ', 'HNN', 'HNE', 'HHZ', 'HHN', 'HHE']
df['channel'] = np.random.choice(channels, size=num_events, p=[0.25, 0.25, 0.25, 0.083, 0.083, 0.084])

# Generate Azimuths
df['azimuth'] = np.random.uniform(0, 360, size=num_events)

sns.set_style("whitegrid")

# Plot 1: Magnitude and Depth Distribution
plt.figure(figsize=(10, 6))
sns.scatterplot(x='magnitude', y='depth', data=df.sample(2000), alpha=0.5, hue='magnitude', palette='viridis', legend=False)
plt.gca().invert_yaxis()
plt.title('Magnitude vs Depth Distribution', fontsize=14, fontweight='bold')
plt.xlabel('Magnitude (Mw)', fontsize=12)
plt.ylabel('Depth (km)', fontsize=12)
plt.savefig('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/Magnitude_Depth_distribution.png', bbox_inches='tight', dpi=150)
plt.close()

# Plot 2: Event Stream Graph
df['year_month'] = df['timestamp'].dt.to_period('M')
monthly_counts = df.groupby('year_month').size().reset_index(name='counts')
monthly_counts['year_month'] = monthly_counts['year_month'].dt.to_timestamp()

plt.figure(figsize=(12, 6))
plt.plot(monthly_counts['year_month'], monthly_counts['counts'], color='#0d6efd', linewidth=2)
plt.fill_between(monthly_counts['year_month'], monthly_counts['counts'], alpha=0.3, color='#0d6efd')
plt.title('Oklahoma Earthquake Event Stream (2010-2024)', fontsize=14, fontweight='bold')
plt.xlabel('Date', fontsize=12)
plt.ylabel('Number of Events', fontsize=12)
plt.grid(True, alpha=0.3)
plt.savefig('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/stream.png', bbox_inches='tight', dpi=150)
plt.savefig('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/event-stream-preview.png', bbox_inches='tight', dpi=150)
plt.close()

# Plot 3: Network Distribution
plt.figure(figsize=(8, 5))
sns.countplot(x='network', data=df, palette='pastel')
plt.title('Seismic Network Distribution', fontsize=14, fontweight='bold')
plt.xlabel('Network Code', fontsize=12)
plt.ylabel('Count', fontsize=12)
plt.savefig('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/Network_distribution_bar.png', bbox_inches='tight', dpi=150)
plt.close()

# Plot 4: Channel Distribution
plt.figure(figsize=(8, 8))
channel_counts = df['channel'].value_counts()
plt.pie(channel_counts, labels=channel_counts.index, autopct='%1.1f%%', colors=sns.color_palette('pastel'), startangle=90)
plt.title('Channel Distribution', fontsize=14, fontweight='bold')
plt.savefig('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/Channel_Distribution_Pie_Chart.png', bbox_inches='tight', dpi=150)
plt.close()

# Plot 5: Azimuth Distribution
plt.figure(figsize=(8, 8))
ax = plt.subplot(111, polar=True)
bins = np.linspace(0, 2*np.pi, 36)
counts, _ = np.histogram(np.radians(df['azimuth']), bins=bins)
ax.bar(bins[:-1], counts, width=2*np.pi/36, color='skyblue', alpha=0.7, edgecolor='navy')
ax.set_theta_zero_location("N")
ax.set_theta_direction(-1)
plt.title('Azimuth Distribution', y=1.08, fontsize=14, fontweight='bold')
plt.savefig('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/Azimuth_Distribution_Pie_Chart.png', bbox_inches='tight', dpi=150)
plt.close()

# Plot 6: Bar and Pie Seismic Event Counts
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
sns.countplot(x='station', data=df, palette='Set2', ax=ax1)
ax1.set_title('Event Counts per Station', fontsize=12, fontweight='bold')
ax1.set_xlabel('Station Code', fontsize=10)
ax1.set_ylabel('Count', fontsize=10)

station_counts = df['station'].value_counts()
ax2.pie(station_counts, labels=station_counts.index, autopct='%1.1f%%', colors=sns.color_palette('Set2'), startangle=90)
ax2.set_title('Proportion of Events per Station', fontsize=12, fontweight='bold')

plt.tight_layout()
plt.savefig('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/bar_and_pie_seismic_event_counts_ver_1.png', bbox_inches='tight', dpi=150)
plt.savefig('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/history-analysis-preview.png', bbox_inches='tight', dpi=150)
plt.close()

# Plot 7: Event Ridgeplot Over Years
df['year'] = df['timestamp'].dt.year
plt.figure(figsize=(10, 8))
sns.kdeplot(data=df, x='magnitude', hue='year', fill=False, palette='viridis', common_norm=False, linewidth=2, warn_singular=False)
plt.title('Magnitude Distribution Over Years', fontsize=14, fontweight='bold')
plt.xlabel('Magnitude (Mw)', fontsize=12)
plt.ylabel('Density', fontsize=12)
plt.xlim(0, 6)
plt.savefig('/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/event_ridgeplot_over_years.png', bbox_inches='tight', dpi=150)
plt.close()

# Generate predictive plots (Prediction10 to 22)
for i in range(10, 23):
    plt.figure(figsize=(8, 4))
    t = np.linspace(0, 10, 1000)
    # produce a slightly varying waveform pattern
    freq = 1.5 + np.random.uniform(-0.5, 0.5)
    wave = np.sin(2 * np.pi * freq * t) * np.exp(-t/3)
    noise = np.random.normal(0, 0.05, 1000)
    
    # Anomaly
    pred_anomaly = np.zeros(1000)
    anomaly_start = np.random.randint(300, 600)
    anomaly_len = np.random.randint(100, 250)
    pred_anomaly[anomaly_start:anomaly_start+anomaly_len] = np.sin(2 * np.pi * (freq*2) * t[anomaly_start:anomaly_start+anomaly_len]) * np.exp(-(t[anomaly_start:anomaly_start+anomaly_len]-t[anomaly_start])/1)
    
    plt.plot(t, wave + noise + pred_anomaly, color='gray', label='Raw Input Trace', alpha=0.7)
    plt.plot(t[anomaly_start:anomaly_start+anomaly_len], wave[anomaly_start:anomaly_start+anomaly_len] + pred_anomaly[anomaly_start:anomaly_start+anomaly_len], color='red', label='Detected P-wave Arrival', linewidth=2)
    
    plt.title(f'AI Prediction Output - Event #{i*1000 + np.random.randint(100,999)}', fontsize=12, fontweight='bold')
    plt.xlabel('Time (s)', fontsize=10)
    plt.ylabel('Normalized Amplitude', fontsize=10)
    plt.legend(loc='upper right')
    plt.savefig(f'/home/hongyu/Codes/OKLAD_Demo.io/assets/plots/Prediction{i}_Predictions_Plot.png', bbox_inches='tight', dpi=100)
    plt.close()

print("All plots generated successfully.")
