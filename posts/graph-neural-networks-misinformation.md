# Graph Neural Networks for Misinformation: Benchmarking GCN, GAT, and GraphSAGE on Cascade Graphs

*Published on July 10, 2026 • 7 min read • Category: Deep Learning & Graph AI*

---

Traditional Natural Language Processing (NLP) models treat news articles or social posts as isolated text sequences. However, modern misinformation campaigns rarely succeed through textual persuasion alone; their defining characteristic is their **propagation topology**—how information cascades, retweets, and echoes through social graphs.

In this research project, we benchmarked multiple Graph Neural Network (GNN) architectures—Graph Convolutional Networks (GCN), Graph Attention Networks (GAT), Graph Isomorphism Networks (GIN), and GraphSAGE—on the UPFD benchmark dataset to uncover topological signatures of fake news.

---

## 1. Graph Formulation of Information Cascades

We model each diffusion cascade as a directed tree graph $G = (V, E, X)$:
- **Nodes $v_i \in V$**: Users participating in the retweet or sharing tree.
- **Edges $e_{ij} \in E$**: Retweet or citation connections indicating information flow.
- **Node Features $x_i \in X$**: A concatenation of 768-dimensional BERT linguistic embeddings of the tweet content, user historical metadata (account age, verified status, follower ratio), and temporal diffusion intervals.

```
       Root News Source (BERT Node 0)
              /        \
             ▼          ▼
         User A        User B
        /      \          |
       ▼        ▼         ▼
     User C   User D    User E
```

---

## 2. Graph Attention Networks (GAT) Implementation

In misinformation spread, not all user connections carry equal weight. Graph Attention Networks use self-attention coefficients to weigh neighboring influences dynamically:

$$\alpha_{ij} = \frac{\exp\left(\text{LeakyReLU}\left(\mathbf{a}^T [\mathbf{W} \vec{h}_i \,\|\, \mathbf{W} \vec{h}_j]\right)\right)}{\sum_{k \in \mathcal{N}_i} \exp\left(\text{LeakyReLU}\left(\mathbf{a}^T [\mathbf{W} \vec{h}_i \,\|\, \mathbf{W} \vec{h}_k]\right)\right)}$$

Here is the PyTorch Geometric implementation we trained:

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch_geometric.nn import GATConv, global_mean_pool

class MisinformationGAT(nn.Module):
    def __init__(self, in_channels, hidden_channels, out_channels=2, heads=4):
        super(MisinformationGAT, self).__init__()
        self.conv1 = GATConv(in_channels, hidden_channels, heads=heads, dropout=0.3)
        self.conv2 = GATConv(hidden_channels * heads, hidden_channels, heads=1, concat=False, dropout=0.3)
        self.classifier = nn.Linear(hidden_channels, out_channels)
        
    def forward(self, x, edge_index, batch):
        # 1. Message Passing Layer 1
        x = F.dropout(x, p=0.3, training=self.training)
        x = F.elu(self.conv1(x, edge_index))
        
        # 2. Message Passing Layer 2
        x = F.dropout(x, p=0.3, training=self.training)
        x = self.conv2(x, edge_index)
        
        # 3. Graph-Level Readout / Pooling
        x = global_mean_pool(x, batch)
        
        # 4. Final Classification Logits
        return self.classifier(x)
```

---

## 3. Benchmark Comparisons

We ran hyperparameter optimization with Optuna across 50 trials for each model family on the UPFD dataset:

| Model Architecture | Accuracy (%) | F1-Macro | Key Advantage |
| :--- | :--- | :--- | :--- |
| **Standalone BERT (Text Only)** | 78.4% | 0.772 | Misses network echo chambers |
| **Graph Convolutional Network (GCN)** | 84.1% | 0.835 | Fast spatial propagation |
| **GraphSAGE** | 86.3% | 0.858 | Inductive scaling to large subgraphs |
| **Graph Attention Network (GAT)** | **88.7%** | **0.884** | Weighs deceptive amplifier bot nodes |

---

## 4. Key Takeaways

1. **Topology Complements Semantics**: Combining linguistic BERT embeddings with graph diffusion topology boosts F1 scores by over 11% compared to analyzing text in isolation.
2. **Amplifier Bots Exhibit Distinct Attention Weights**: In GAT layers, bot clusters exhibited sharp attention bottlenecks, serving as dead giveaways for coordinated inauthentic behavior.
3. **Optuna Pruning Cuts Search Time by 65%**: Hyperband pruning enabled exploring broad learning rate, dropout, and head combinations without GPU waste.

Explore the complete source code, notebooks, and models on GitHub:
- [Fake News Detection GNN Repository](https://github.com/santoshkkashyap25/fake-news-detection-gnn)
