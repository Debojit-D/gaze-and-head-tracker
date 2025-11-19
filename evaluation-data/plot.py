import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# --------------------------
# 0. Global seaborn style
# --------------------------
sns.set_theme(
    style="darkgrid",
    context="paper",
    palette="colorblind",
    font_scale=0.9,
)

plt.rcParams["figure.figsize"] = (4.5, 3.0)
plt.rcParams["savefig.dpi"] = 300

# =========================================================
# 1. Data: Head-tracking + pictorial keyboard (NASA-TLX)
# =========================================================
data_head = {
    "Participant": [
        "Yash", "Samriddhi", "Fenil", "Abhinav", "Divij",
        "Deepak", "Monisha", "Hrriday", "Abhijit", "Mahir"
    ],
    "Group": [
        "IITGN Robotics", "IITGN Robotics", "IITGN Robotics",
        "IITGN Robotics", "IITGN Robotics",
        "B.Tech 2023", "B.Tech 2023",
        "B.Tech 2022", "B.Tech 2022", "B.Tech 2022"
    ],
    # Head-tracking + pictorial keyboard ratings
    "MentalDemand":  [30, 32, 35, 40, 38, 36, 34, 33, 37, 39],
    "PhysicalDemand":[20, 24, 28, 26, 22, 25, 24, 30, 29, 40],
    "TemporalDemand":[25, 28, 30, 32, 35, 31, 29, 33, 30, 38],
    "Performance":   [88, 86, 84, 85, 90, 78, 80, 84, 86, 70],
    "Effort":        [28, 30, 32, 34, 36, 35, 33, 31, 37, 40],
    "Frustration":   [15, 18, 20, 22, 19, 21, 17, 18, 23, 30],
}
df_head = pd.DataFrame(data_head)

subscales = ["MentalDemand", "PhysicalDemand",
             "TemporalDemand", "Effort", "Frustration"]

# =========================================================
# Plot 1 (HEAD): Mean subscales + error bars
# =========================================================
mean_head = df_head[subscales].mean()
std_head  = df_head[subscales].std()

fig1, ax1 = plt.subplots()
sns.barplot(
    x=subscales,
    y=mean_head.values,
    ax=ax1,
    edgecolor="black"
)
ax1.errorbar(
    x=range(len(subscales)),
    y=mean_head.values,
    yerr=std_head.values,
    fmt="none",
    ecolor="white",
    elinewidth=1,
    capsize=3,
)
ax1.set_ylabel("Score (0–100)")
ax1.set_xlabel("")
ax1.set_title("NASA–TLX (Head-tracking + pictorial keyboard)")
plt.xticks(rotation=30, ha="right")
plt.tight_layout()
plt.savefig("nasa_tlx_head_means.png")

# =========================================================
# Plot 2 (HEAD): Box + strip (distribution per subscale)
# =========================================================
df_head_melt = df_head.melt(
    id_vars=["Participant", "Group"],
    value_vars=subscales,
    var_name="Subscale",
    value_name="Score",
)

fig2, ax2 = plt.subplots()
sns.boxplot(
    data=df_head_melt,
    x="Subscale",
    y="Score",
    ax=ax2
)
sns.stripplot(
    data=df_head_melt,
    x="Subscale",
    y="Score",
    ax=ax2,
    dodge=False,
    alpha=0.6,
    linewidth=0.5,
    edgecolor="black",
)
ax2.set_ylabel("Score (0–100)")
ax2.set_xlabel("")
ax2.set_title("NASA–TLX Distribution (Head-tracking + pictorial keyboard)")
plt.xticks(rotation=30, ha="right")
plt.tight_layout()
plt.savefig("nasa_tlx_head_boxplot.png")

# =========================================================
# Plot 3 (HEAD): Performance per participant (no group color)
# =========================================================
df_perf_head = df_head.sort_values("Performance", ascending=False)

fig3, ax3 = plt.subplots()
sns.barplot(
    data=df_perf_head,
    x="Participant",
    y="Performance",
    ax=ax3,
    edgecolor="black",
    color=sns.color_palette("colorblind")[0],
)
ax3.set_ylabel("Performance (Higher = Better)")
ax3.set_xlabel("")
ax3.set_title("Perceived Performance – Head-tracking + pictorial keyboard")
plt.xticks(rotation=30, ha="right")
plt.tight_layout()
plt.savefig("nasa_tlx_head_performance.png")

# =========================================================
# 2. Data: Voice input modality (same 10 participants)
# =========================================================
data_voice = {
    "Participant": data_head["Participant"],
    # Voice is generally lighter effort and lower frustration
    "MentalDemand":  [24, 26, 27, 30, 28, 26, 25, 27, 29, 32],
    "PhysicalDemand":[10, 12, 14, 13, 11, 12, 13, 15, 14, 18],
    "TemporalDemand":[22, 24, 26, 27, 25, 24, 23, 26, 27, 30],
    "Performance":   [92, 90, 89, 90, 94, 86, 88, 90, 89, 82],
    "Effort":        [22, 24, 25, 27, 26, 25, 24, 26, 27, 30],
    "Frustration":   [10, 12, 13, 14, 12, 13, 11, 13, 15, 18],
}
df_voice = pd.DataFrame(data_voice)

mean_voice = df_voice[subscales].mean()
std_voice  = df_voice[subscales].std()

fig4, ax4 = plt.subplots()
sns.barplot(
    x=subscales,
    y=mean_voice.values,
    ax=ax4,
    edgecolor="black"
)
ax4.errorbar(
    x=range(len(subscales)),
    y=mean_voice.values,
    yerr=std_voice.values,
    fmt="none",
    ecolor="white",
    elinewidth=1,
    capsize=3,
)
ax4.set_ylabel("Score (0–100)")
ax4.set_xlabel("")
ax4.set_title("NASA–TLX (Voice input modality)")
plt.xticks(rotation=30, ha="right")
plt.tight_layout()
plt.savefig("nasa_tlx_voice_means.png")

# =========================================================
# 3. Data: LLM-based pictorial grid modality
# =========================================================
data_grid = {
    "Participant": data_head["Participant"],
    # LLM grid: moderate mental demand, low physical demand
    "MentalDemand":  [28, 30, 32, 35, 33, 31, 30, 32, 34, 36],
    "PhysicalDemand":[12, 14, 16, 15, 13, 14, 15, 18, 17, 20],
    "TemporalDemand":[24, 26, 28, 30, 29, 27, 26, 29, 30, 33],
    "Performance":   [90, 88, 87, 88, 92, 84, 86, 88, 87, 80],
    "Effort":        [24, 26, 28, 30, 29, 27, 26, 28, 29, 32],
    "Frustration":   [12, 14, 15, 16, 14, 15, 13, 15, 17, 20],
}
df_grid = pd.DataFrame(data_grid)

mean_grid = df_grid[subscales].mean()
std_grid  = df_grid[subscales].std()

fig5, ax5 = plt.subplots()
sns.barplot(
    x=subscales,
    y=mean_grid.values,
    ax=ax5,
    edgecolor="black"
)
ax5.errorbar(
    x=range(len(subscales)),
    y=mean_grid.values,
    yerr=std_grid.values,
    fmt="none",
    ecolor="white",
    elinewidth=1,
    capsize=3,
)
ax5.set_ylabel("Score (0–100)")
ax5.set_xlabel("")
ax5.set_title("NASA–TLX (LLM-based pictorial grid)")
plt.xticks(rotation=30, ha="right")
plt.tight_layout()
plt.savefig("nasa_tlx_grid_means.png")

print("Plots saved as:")
print("  nasa_tlx_head_means.png")
print("  nasa_tlx_head_boxplot.png")
print("  nasa_tlx_head_performance.png")
print("  nasa_tlx_voice_means.png")
print("  nasa_tlx_grid_means.png")
