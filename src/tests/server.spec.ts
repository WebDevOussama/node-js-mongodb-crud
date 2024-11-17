import type IServer from '@core/interfaces/server';
import type { MongoDBConnection } from '@infrastructure/database/mongodb-connection';
import { instance, mock, verify, when } from 'ts-mockito';
import AppServer from '../server';

describe('AppServer', () => {
  let mockServer: IServer;
  let mockMongoDBConnection: MongoDBConnection;
  let appServer: AppServer;

  beforeEach(() => {
    mockServer = mock<IServer>();
    mockMongoDBConnection = mock<MongoDBConnection>();

    appServer = new AppServer(
      instance(mockServer),
      instance(mockMongoDBConnection),
    );
  });

  it('should initialize the server and connect to MongoDB', async () => {
    // Arrange
    when(mockServer.initializeServer()).thenResolve();
    when(mockMongoDBConnection.connect()).thenResolve();

    // Act
    await appServer.initialize();

    // Assert
    verify(mockServer.initializeServer()).once();
    verify(mockMongoDBConnection.connect()).once();
  });

  it('should handle errors during server initialization', async () => {
    // Arrange
    const initializeServerError = new Error('Initialization failed');
    when(mockServer.initializeServer()).thenReject(initializeServerError);

    // Act & Assert
    await expect(appServer.initialize()).rejects.toThrow(initializeServerError);
    verify(mockServer.initializeServer()).once();
    verify(mockMongoDBConnection.connect()).never(); // Connect should not be called if initialization fails
  });

  it('should handle errors during MongoDB connection', async () => {
    // Arrange
    when(mockServer.initializeServer()).thenResolve();
    const connectError = new Error('MongoDB connection failed');
    when(mockMongoDBConnection.connect()).thenReject(connectError);

    // Act & Assert
    await expect(appServer.initialize()).rejects.toThrow(connectError);
    verify(mockServer.initializeServer()).once();
    verify(mockMongoDBConnection.connect()).once();
  });
});
