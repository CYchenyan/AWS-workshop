### 1. CloudWatch 是什么？我们为什么要使用CloudWatch？

Amazon CloudWatch 会监控您的 Amazon Web Services (AWS) 资源以及您在上运行的应用程序AWS实时。您可以使用 CloudWatch 收集和跟踪指标，这些指标是您可衡量的相关资源和应用程序的变量。

CloudWatch 主页自动显示有关每个AWS服务。此外，您还可以创建自定义控制面板，以显示有关自定义应用程序的指标，并显示您选择的指标的自定义集合。

您可以创建警报，这些警报监视指标，当超出阈值时，它们会发送通知或者对您所监控的资源自动进行更改。例如，您可以监控 Amazon EC2 实例的 CPU 使用率以及磁盘读写情况，然后使用此数据确定您是否应启动其他实例来处理增加的负载。您还可以使用此数据停止未完全利用的实例以节省开支。

通过 CloudWatch，您可以在全面地了解资源使用率、应用程序性能和运行状况。

[文档地址](https://docs.aws.amazon.com/zh_cn/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)


### 2. CloudWatch中的metrics是什么？包括哪些种类？我们可以如何使用metrics？

指标是 CloudWatch 中的基本概念。指标代表一个发布到 CloudWatch 的按时间顺序的数据点集。可将指标视为要监控的变量，而数据点代表该变量随时间变化的值。例如，特定 EC2 实例的 CPU 使用率是 Amazon EC2 提供的一个指标。数据点本身可来自于您从中收集数据的任何应用程序或业务活动。

默认情况下，许多AWS服务提供资源（例如 Amazon EC2 实例、Amazon EBS 卷和 Amazon RDS 数据库实例）的免费指标。付费，您还可以启用对某些资源（如 Amazon EC2 实例）的详细监控，或发布您自己的应用程序指标。对于自定义指标，您可以按照您选择的任何顺序和任何速率添加数据点。您可以按一组有序的时间序列数据来检索关于这些数据点的统计数据。

指标仅存在于创建它们的区域中。指标无法删除，但如果在 15 个月后没有向指标发布新数据，这些指标将自动过期。依据滚动机制，15 个月之前的数据点将过期；当新的数据点进入时，15 个月之前的数据将被丢弃。

指标是通过一个名称、一个命名空间以及零个或多个维度进行唯一定义的。指标中的每个数据点都有一个时间戳和一个度量单位（可选）。您可以从 CloudWatch 中检索任何指标的统计数据。

### 3. CloudWatch Events是什么？可以应用在那些场景。
事件表示您的AWS环境的费用。AWS资源可以在其状态更改时生成事件。例如，Amazon EC2 将在 EC2 实例的状态从待处理更改为正在运行时生成事件，Amazon EC2 Auto Scaling 在启动或终止实例时生成事件。AWS CloudTrail会在您进行 API 调用时发布事件。您可以生成自定义应用程序级事件并将其发布到 CloudWatch Events。您还可以设置定期生成的计划事件。有关生成事件的服务的列表，以及来自每项服务的示例事件

[文档地址](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html)

### 4. 相关概念理解：metrics，periods，namespace，count，dimensions，statistics。

metrics: 指标是 CloudWatch 中的基本概念。指标代表一个发布到 CloudWatch 的按时间顺序的数据点集。可将指标视为要监控的变量，而数据点代表该变量随时间变化的值
periods: 
namespace: 命名空间是 CloudWatch 指标的容器。不同命名空间中的指标彼此独立，因此来自不同应用程序的指标不会被错误地聚合到相同的统计信息中。
count:
dimensions: 维度是一个名称/值对，它是指标标识的一部分。您可以为一个指标分配最多 10 个维度
statistics: 统计数据是在指定的时间段内汇总的指标数据。

[文档地址](https://docs.aws.amazon.com/zh_cn/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Dimension)