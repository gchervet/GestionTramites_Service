var dbconfig = require('../../config/db-configuration.json');

/* Database Generator */
exports.GenerateDB = function (legajo) {
    console.log('DBConfiguration/GenerateDB');

    var bdstr = 'USE [' + dbconfig.initial_catalog + '] ' +
        'GO ' +

        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +
        'CREATE PROCEDURE [dbo].[SP_Get_PermissionByUsername] ' +
        '@username varchar(60) ' +
        'AS ' +
        'BEGIN ' +
        'SET NOCOUNT ON; ' +

        'SELECT Name FROM Permission  ' +
        'WHERE Id in  ' +
        '( ' +
        'SELECT IdPermission FROM RolePermission  ' +
        'WHERE [IdRole] =  ' +
        '( ' +
        'SELECT idRole FROM UserRole  ' +
        'WHERE Username = @username ' +
        ') ' +
        ') ' +

        'END ' +

        'GO ' +
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +

        'CREATE PROCEDURE [dbo].[SP_MenuGroup_Menu_GetAll] ' +
        'AS ' +
        'BEGIN ' +
        'SET NOCOUNT ON; ' +

        'SELECT  ' +
        'mg.Id IdMenuGroup, ' +
        'mg.Name MenuGroupName, ' +
        'mg.Detail MenuGroupDetail, ' +
        'm.Id IdMenu, ' +
        'm.Name MenuName ' +
        'FROM MenuGroup mg ' +
        'INNER JOIN Menu m on mg.id = m.IdMenuGroup ' +

        'END ' +

        'GO ' +
        
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +

        'CREATE PROCEDURE [dbo].[SP_MenuGroup_Menu_Permission_GetAll] ' +
        'AS ' +
        'BEGIN ' +
        'SET NOCOUNT ON; ' +

        'SELECT  ' +
        'mg.Id IdMenuGroup, ' +
        'mg.Name MenuGroupName, ' +
        'mg.Detail MenuGroupDetail, ' +
        'm.Id IdMenu, ' +
        'm.Name MenuName, ' +
        'm.Detail MenuDetail, ' +
        'p.Id IdPermission, ' +
        'p.Name PermissionName ' +
        'FROM MenuGroup mg ' +
        'INNER JOIN Menu m on mg.id = m.IdMenuGroup ' +
        'INNER JOIN MenuPermission mp on m.Id = mp.IdMenu ' +
        'INNER JOIN Permission p on mp.IdPermission = p.Id ' +

        'END ' +

        'GO ' +
        
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +
        'SET ANSI_PADDING ON ' +
        'GO ' +
        'CREATE TABLE [dbo].[Menu]( ' +
        '[Id] [int] IDENTITY(1,1) NOT NULL, ' +
        '[IdMenuGroup] [int] NOT NULL, ' +
        '[Name] [varchar](255) NOT NULL, ' +
        '[Detail] [varchar](255) NULL, ' +
        'CONSTRAINT [PK_Menu] PRIMARY KEY CLUSTERED  ' +
        '( ' +
        '[Id] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY], ' +
        ' CONSTRAINT [Unique_Menu] UNIQUE NONCLUSTERED  ' +
        '( ' +
        '[Name] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] ' +
        ') ON [PRIMARY] ' +

        'GO ' +
        'SET ANSI_PADDING OFF ' +
        'GO ' +
        
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +
        'SET ANSI_PADDING ON ' +
        'GO ' +
        'CREATE TABLE [dbo].[MenuGroup]( ' +
        '[Id] [int] IDENTITY(1,1) NOT NULL, ' +
        '[Name] [varchar](255) NOT NULL, ' +
        '[Detail] [varchar](255) NULL, ' +
        'CONSTRAINT [PK_MenuGroup] PRIMARY KEY CLUSTERED  ' +
        '( ' +
        '[Id] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY], ' +
        ' CONSTRAINT [Unique_MenuGroup] UNIQUE NONCLUSTERED  ' +
        '( ' +
        '[Name] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] ' +
        ') ON [PRIMARY] ' +

        'GO ' +
        'SET ANSI_PADDING OFF ' +
        'GO ' +
        
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +
        'CREATE TABLE [dbo].[MenuPermission]( ' +
        '[IdMenu] [int] NOT NULL, ' +
        '[IdPermission] [int] NOT NULL, ' +
        'CONSTRAINT [PK_MenuPermission] PRIMARY KEY CLUSTERED  ' +
        '( ' +
        '[IdMenu] ASC, ' +
        '[IdPermission] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] ' +
        ') ON [PRIMARY] ' +

        'GO ' +
        
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +
        'SET ANSI_PADDING ON ' +
        'GO ' +
        'CREATE TABLE [dbo].[Permission]( ' +
        '[Id] [int] IDENTITY(1,1) NOT NULL, ' +
        '[Name] [varchar](255) NOT NULL, ' +
        'CONSTRAINT [PK_Permission] PRIMARY KEY CLUSTERED  ' +
        '( ' +
        '[Id] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY], ' +
        'CONSTRAINT [Unique_Permission] UNIQUE NONCLUSTERED  ' +
        '( ' +
        '[Name] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] ' +
        ') ON [PRIMARY] ' +

        'GO ' +
        'SET ANSI_PADDING OFF ' +
        'GO ' +
        
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +
        'SET ANSI_PADDING ON ' +
        'GO ' +
        'CREATE TABLE [dbo].[Role]( ' +
        '[Id] [int] IDENTITY(1,1) NOT NULL, ' +
        '[Name] [varchar](255) NOT NULL, ' +
        'CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED  ' +
        '( ' +
        '[Id] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY], ' +
        'CONSTRAINT [Unique_Role] UNIQUE NONCLUSTERED  ' +
        '( ' +
        '[Name] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] ' +
        ') ON [PRIMARY] ' +

        'GO ' +
        'SET ANSI_PADDING OFF ' +
        'GO ' +
        
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +
        'CREATE TABLE [dbo].[RolePermission]( ' +
        '[IdRole] [int] NOT NULL, ' +
        '[IdPermission] [int] NOT NULL, ' +
        'CONSTRAINT [PK_RolePermission] PRIMARY KEY CLUSTERED  ' +
        '( ' +
        '[IdRole] ASC, ' +
        '[IdPermission] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] ' +
        ') ON [PRIMARY] ' +

        'GO ' +
        
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +
        'SET ANSI_PADDING ON ' +
        'GO ' +
        'CREATE TABLE [dbo].[SessionToken]( ' +
        '[Username] [varchar](60) NOT NULL, ' +
        '[SessionToken] [varchar](max) NOT NULL, ' +
        '[CreationDate] [datetime] NOT NULL, ' +
        '[ExpirationDate] [datetime] NOT NULL, ' +
        '[Expired] [bit] NOT NULL ' +
        ') ON [PRIMARY] TEXTIMAGE_ON [PRIMARY] ' +

        'GO ' +
        'SET ANSI_PADDING OFF ' +
        'GO ' +
        
        'SET ANSI_NULLS ON ' +
        'GO ' +
        'SET QUOTED_IDENTIFIER ON ' +
        'GO ' +
        'CREATE TABLE [dbo].[UserRole]( ' +
        '[Username] [nvarchar](255) NOT NULL, ' +
        '[IdRole] [int] NOT NULL, ' +
        'CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED  ' +
        '( ' +
        '[Username] ASC, ' +
        '[IdRole] ASC ' +
        ')WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY] ' +
        ') ON [PRIMARY] ' +

        'GO ' +
        'ALTER TABLE [dbo].[SessionToken] ADD  CONSTRAINT [DF_SessionToken_CreationDate]  DEFAULT (getdate()) FOR [CreationDate] ' +
        'GO ';


    return new sql.ConnectionPool(dbconfig).connect().then(pool => {
        return pool.request().query(bdstr)
    });
}

