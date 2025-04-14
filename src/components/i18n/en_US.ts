import { en_US } from "ng-zorro-antd/i18n";

export default {
  ...en_US,
  global: {
    ...en_US.global,
    Setting: "Setting",
    Rename: "Rename",
    LearnMore: "Learn More",
    Name: "Name",
    Description: "Description",
    Method: "Method",
    Path: "Path",
    ChunkMode: "Chunk Mode",
    WordCount: "Word Count",
    RetrievalCount: "Retrieval Count",
    Action: "Action",
    NoData: "No Data",
    NoMoreData: "No More Data",
    LoadMore: "Load More",
    Search: "Search",
    UPLOADTIME: "Upload time",
    Status: "Status",
    Available: "Available",
    Disabled: "Disabled",
    Cancel: "Cancel",
    Save: 'Save',
    Ok: 'OK',
    Deploy: 'Deploy',
    Delete: 'Delete',
    Edit: 'Edit',
    Publish: 'Publish',
    Add: 'Add',
    Generate: 'Generate',
    Run: 'Run'
  },
  Menu: {
    Model: 'Model',
    ModelList: 'Model List',
    RunningModels: 'Running Models',
    Role: 'Role',
    RoleList: 'Role List',
    GenerateRole: 'Generator Role',
    QuickCommand: 'Quick Command',
    Knowledge: 'Knowledge',
    KnowledgeList: 'Knowledge List',
    CreateKnowledge: 'Create Knowledge',
    Tools: 'Tools',
    ToolList: 'Tool List',
    Agent: 'Agent',
    AgentList: 'Agent List',
    CreateAgent: 'Create Agent',
    Playground: 'Playground',
    ModelExperience: 'Model Experience',
    AgentExperience: 'Agent Experience',
    ConversationTextModel: 'Text Conversation'
  },
  Knowledge: {
    Knowledge: 'Knowledge',
    KnowledgeDescription: 'Create, manage and search your knowledge base efficiently. Support multiple formats, TOS and other document types.',
    CreateKnowledge: 'Create Knowledge',
    CreateKnowledgeDescription: "Build structured knowledge bases with templates and custom categories",
    CreateKnowledgeTips: "Import your own text data or write data in real-time via Webhook for LLM context enhancement.",
    UploadDocuments: "Upload Documents",
    UploadDocumentsDescription: "Support Excel, PDF and various text formats with OCR capabilities",
    SearchContent: "Search Content",
    SearchContentDescription: "Smart search with filters and quick access to frequently used content",
    APIIntegration: "API Integration",
    APIIntegrationDescription: "Use our API to integrate knowledge base features into your products",
    Welcome: "Welcome to Knowledge👋",
    WelcomeDescription: "Import your own text data or write data in real-time via Webhook for LLM context enhancement.",
    CreateNow: "Create Now",
    DocumentCount: "docs",
    WordCount: "words",
    AppCount: "linked apps",
  },
  KnowledgeDetail: {
    Documents: 'Documents',
    DocumentsDescription: 'All files of the Knowledge are shown here, and the entire Knowledge can be linked to Dify citations or indexed via the Chat plugin. ',
    UploadSectionTitle: 'Upload file',
    UploadText: 'Click or drag file to this area to upload, or',
    UploadBrowse: 'Browse',
    UploadHint: 'Supports TXT, MARKDOWN, DOC, PDF, HTML, XLSX, XLS, DOCX, CSV, MD, HTM, Max 15MB each.',
  },
  KnowledgeModal: {
    title: 'Knowledge setting',
    name: 'Knowledge Name',
    description: 'Knowledge Description',
    deleteTitle: 'Delete knowledge base?',
    deleteContent: 'Deleting a knowledge base is irreversible. Users will no longer be able to access your knowledge base, and all prompt configurations and logs will be permanently deleted.'
  },
  KnowledgeDocument: {
    Metadata: 'Metadata',
    MetadataDescription: 'Reading metadata for documents allows AI to access them in a timely manner and exposes the source of references for users. ',
    DocumentInformation: 'Document Information',
    Original_filename: 'Original filename',
    Original_file_size: 'Original file size',
    Technical_Parameters: 'Technical Parameters',
    Chunks_specification: 'Chunks specification',
    Chunks_length: 'Chunks length',
    Avg_paragraph_length: 'Avg. paragraph length',
    Paragraphs: 'Paragraphs',
    Retrieval_count: 'Retrieval count'
  },
  Model: {
    Launch: 'Launch',
    Try: 'Try',
    Manage: 'Manage',
    UnfavoriteSuccess: 'Unfavorite Success',
    FavoriteSuccess: 'Favorite Success',
    AlertInfo: 'The last configuration has been loaded',
    Replica: 'Replica',
    GPUCount: 'GPU Count',
    OptionalConfigurations: 'Optional Configurations',
    AdditionalParameters: 'Additional parameters passed to the inference engine',
    OptionalUId: '(Optional) Model UID, model name by default',
    OptionalRequestLimits: '(Optional) Request Limits, the number of request limits for this model, default is None',
    OptionalWorkerIp: '(Optional) Worker Ip, specify the worker ip where the model is located in a distributed scenario',
    OptionalGpuIdx: '(Optional) GPU Idx, Specify the GPU index where the model is located',
    OptionalDownloadHub: '(Optional) Download_hub',
    OptionalModelPath: '(Optional) Model Path, For PyTorch, provide the model directory. For GGML/GGUF, provide the model file path.',
    Type: {
      All: 'All',
      LanguageModels: 'Language Models',
      EmbeddingModels: 'Embedding Models',
      RerankModels: 'Rerank Models',
      ImageModels: 'Image Models',
      AudioModels: 'Audio Models',
      VideoModels: 'Video Models',
      SynyiModels: 'Synyi Models',
      CustomModels: 'Custom Models',
    },
    Ability: {
      ModelAbility: 'Model Ability',
      Generate: 'generate',
      Chat: 'chat',
      VlChat: 'vl-chat',
      Reasoning: 'reasoning',
    },
    Status: {
      Status: 'Status',
      Cached: 'Cached',
      Favorite: 'Favorite'
    },
  },
  ModelsRunning: {
    ID: 'ID',
    Name: 'Name',
    Address: 'Address',
    GPUIndexes: 'GPU Indexes',
    Size: 'Size',
    Quantization: 'Quantization',
    Replica: 'Replica',
    Actions: 'Actions',
    DeleteModel: 'Delete Model Running',
    DeleteModelContent: 'Are you sure you want to delete this model running?',
    LaunchSuccess: 'Model launch success',
    ServerError: 'Server error:503-laddress=0.0.0.0:44751,pid=4684|No available model precision found',
  },
  Step: {
    Next: 'Next',
    Previous: 'Previous'
  },
  DocumentProcessing: {
    ChunkSettings: 'Chunk Settings',
    General: 'General',
    GeneralDescription: 'General text chunking mode, the chunks retrieved and recalled are the same.',
    Delimiter: 'Delimiter',
    Maximum_chunk_length: 'Maximum chunk length',
    Chunk_overlap: 'Chunk overlap',
    Text_Pre_processing_Rules: 'Text Pre-processing Rules',
    remove_extra_spaces: 'Replace consecutive spaces, newlines and tabs',
    remove_urls_emails: 'Delete all URLs and email addresses',
    Preview_Chunk: 'Preview Chunk',
    indexing_technique: 'Indexing technique',
    Economical: 'Economical',
    EconomicalDescription: 'Using 10 keywords per chunk for retrieval, no tokens are consumed at the expense of reduced retrieval accuracy.',
    HighQuality: 'High Quality',
    HighQualityDescription: 'Calling the embedding model to process documents for more precise retrieval helps LLM generate high-quality answers.',
    RetrievalSetting: 'Retrieval Setting',
    RetrievalIntro: 'Learn more about retrieval method, you can change this at any time in the Knowledge settings.',
    InvertedIndex: 'Inverted Index',
    InvertedIndexDescription: 'Inverted Index is a structure used for efficient retrieval. Organized by terms, each term points to documents or web pages containing it.',
    Save_Process: 'Save & Process ',
    DelimiterTip: "Delimiters are characters used to separate text. \\n\\n and \\n are commonly used to separate paragraphs and lines. Use commas to concatenate delimiters (\n\n,\n). When a paragraph exceeds the maximum block length, it will be split into lines. You can also use custom special delimiters (such as ***)",
    DelimiterPlaceholder: "\\n\\n is used for paragraph separation; \\n is used for line separation",
    ChunkOverlapTip: "Setting the overlap length between segments can preserve the semantic relationship between segments and improve the recall effect. It is recommended to set it to 10%-25% of the maximum segment length.",
    IndexingTechnique: {
      HighQualityTip: "After embedding in high quality mode, you cannot switch back to economy mode."
    },
    Retrieval: {
      RerankModel: "Rerank Model",
      EmbeddingModel: "Embedding Model",
      RerankModelTip: "The re-ranking model will re-rank the candidate document list according to the semantic match between the user question, thereby improving the semantic ranking results.",
      ScoreThresholdTip: "Used to set the similarity threshold for text fragment filtering",
      TopKTip: "Used to filter text segments that are most similar to user questions. The system will also dynamically adjust the number of segments based on the size of the selected model context window.",
      IndexSearch_Semantic: "Semantic Search",
      IndexSearch_Semantic_Desc: "By generating a query embedding and querying for the text segment that is most similar to its vector representation",
      IndexSearch_FullText: "Full Text Search",
      IndexSearch_FullText_Desc: "Indexes all the terms in a document, allowing users to search for arbitrary terms and return text snippets containing those terms",
      IndexSearch_Hybrid: "Hybrid Search",
      IndexSearch_Hybrid_Desc: "Performs full-text search and vector search simultaneously, and applies a re-ranking step to select the best result that matches the user's question from the two types of query results. Users can choose to set weights or configure the re-ranking model",
      Score_threshold: "Score Threshold"
    }
  },
  Role: {
    RoleList: 'Role List',
    RoleListDescription: 'Here you can view and manage your role prompt',
    CreateRole: 'Create Role',
    CreateRoleTitle: 'Welcome to Role Generator',
    CreateRoleDescription: 'AI-powered role prompts, customizable templates.',
    YourRole: 'Your Role',
    YourRoleDescription: 'I want to create a  novel...',
    GeneratedRolePrompt: 'Generated Role Prompt',
    EditBlock: 'Edit Block',
    ModelSelection: 'Model Selection',
    ModelParameters: 'Model Parameters',
    Temperature: 'Temperature',
    TopP: 'Top P',
    RoleName: 'Role Name',
    RoleNamePlaceholder: 'Enter role name',
    RoleNameRequired: 'Role name is required',
    SaveRole: 'Save Role',
    RoleDescription: 'Role Description',
    RoleDescriptionPlaceholder: 'Common prompts for operations management',
    Prompt: 'Prompt',
    CreateCommand: 'Create Command',
    DeleteRole: 'Delete Role',
    DeleteRoleContent: 'Are you sure you want to delete this role?',
    SaveQuickCommand: 'Save Quick Command',
    CommandName: 'Command Name',
    CommandDescription: 'Command Description',
    Tag: 'Tag',
    TagPlaceholder: 'Enter tag',
    CommandNamePlaceholder: 'Enter command name',
    CommandDescriptionPlaceholder: 'Enter command description',
    DeleteCommand: 'Delete Command',
    DeleteCommandContent: 'Are you sure you want to delete this command?',
    CommandTagPlaceholder: 'All tag',
  },
  Message: {
    DeleteSuccess: 'Delete Success',
    SaveSuccess: 'Save Success',
    UploadSuccess: 'Upload Success',
    UploadImageType: 'Only JPG/PNG format images can be uploaded!',
    UploadImageSize: 'The image size cannot exceed 2MB!',
    UploadImageTypeZh: '只能上传 JPG/PNG 格式的图片!',
    UploadImageIcon: 'Please upload an icon',
  },
  Tool: {
    ToolList: 'Tool list',
    CreateTool: 'Create Tool',
    AuthorizationType: 'Authorization Type',
    AuthorizationPrefix: 'Authorization Prefix',
    AuthorizationKey: 'Authorization Key',
    AuthorizationKeyDescription: "HTTP header name, if you don't know what it is, you can leave it as Authorization or set it to a custom value",
  },
  Agent: {
    Agent: 'Agent',
    All: 'All',
    ChatbotAgent: 'Chatbot Agent',
    SmartAgent: 'Smart Agent',
    WorkflowAgent: 'Workflow Agent',
    Agents: 'Agents',
    ChatbotAgentDescription: 'LLM-based chatbot with simple setup',
    SmartAgentDescription: 'Intelligent agent with reasoning and autonomous tool use',
    WorkflowAgentDescription: 'Workflow for complex multi-turn dialogues with memory',
    CreateFromBlank: 'Create from Blank',
    CreateFromTemplate: 'Create from Template',
    ImportFromFile: 'Import from File',
    CreateFromBlankDescription: 'Start with a blank canvas and build your agent from scratch',
    CreateFromTemplateDescription: 'Choose from our pre-built templates to get started quickly',
    ImportFromFileDescription: 'Import your existing DSL file to create a new agent',
    ChooseAgentType: 'Choose Agent Type',
    AgentNameIcon: 'Agent Name & Icon',
    AgentNameIconPlaceholder: 'Give your agent a name',
    Tags: 'Tags',
    Description: 'Description (Optional)',
    DescriptionPlaceholder: 'Enter the description of the agent',
    CreateApp: 'Create App',
    Orchestrate: 'Orchestrate',
    APIAccess: 'API Access',
    LogsAnnotations: 'Logs & Annotations',
    Monitoring: 'Monitoring',
    AgentSettings: 'Agent Settings',
    Instructions: 'Instructions',
    InstructionsPlaceholder: 'Enter your instructions here...',
    Variables: 'Variables',
    VariablesPlaceholder: 'Variables allow users to introduce prompt words or opening remarks when filling out forms. You can try entering "{{input}}" in the prompt words.',
    Knowledge: 'Knowledge',
    Tools: 'Tools',
    VariablesType: {
      Type: 'Variable Type',
      Text: 'Text',
      Paragraph: 'Paragraph',
      Select: 'Select',
      Number: 'Number',
      EditVariable: 'Edit Variable',
      VariableName: 'Variable Name',
      ShowName: 'Show Name',
      MaxLength: 'Max Length',
      Options: 'Options',
      Required: 'Required',
      EnterVariableName: 'Enter variable name',
      EnterShowName: 'Enter show name',
      EnterMaxLength: 'Enter max length',
      AddOption: 'Add Option',
      EnterOption: 'Select option',
      InvalidVariableName: 'Invalid variable name',
      InvalidVariableShowName: 'showName required'
    },
    SelectKnowledge: 'Select reference knowledge base',
    DebugPreview: 'Debug & Preview',
    Workflow: 'Workflow',
    Custom: 'Custom',
    Builtin: 'Builtin',
    SelectTool: 'Select reference Tool base',
    PublishSuccess: 'Publish Success'
  },
  AgentPlayground: {
    deleteTitle: 'Delete conversation?',
    deleteContent: 'Are you sure you want to delete this conversation?'
  }
}
