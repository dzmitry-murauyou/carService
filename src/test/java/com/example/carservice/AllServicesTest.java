package com.example.carservice;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.example.carservice.dto.BulkCarCreateRequest;
import com.example.carservice.dto.BulkCarCreateResult;
import com.example.carservice.dto.CarDto;
import com.example.carservice.dto.ClientDto;
import com.example.carservice.dto.MechanicDto;
import com.example.carservice.dto.OrderDto;
import com.example.carservice.dto.ServiceDto;
import com.example.carservice.dto.SpareDto;
import com.example.carservice.dto.mapper.CarMapper;
import com.example.carservice.dto.mapper.ClientMapper;
import com.example.carservice.dto.mapper.MechanicMapper;
import com.example.carservice.dto.mapper.OrderMapper;
import com.example.carservice.dto.mapper.ServiceMapper;
import com.example.carservice.dto.mapper.SpareMapper;
import com.example.carservice.exception.OrderNotFoundException;
import com.example.carservice.exception.OrderOperationException;
import com.example.carservice.exception.ResourceNotFoundException;
import com.example.carservice.exception.TransactionDemoException;
import com.example.carservice.model.Car;
import com.example.carservice.model.CarBrandModel;
import com.example.carservice.model.Client;
import com.example.carservice.model.Mechanic;
import com.example.carservice.model.Order;
import com.example.carservice.model.ServiceEntity;
import com.example.carservice.model.Spare;
import com.example.carservice.repository.CarBrandModelRepository;
import com.example.carservice.repository.CarRepository;
import com.example.carservice.repository.ClientRepository;
import com.example.carservice.repository.MechanicRepository;
import com.example.carservice.repository.OrderRepository;
import com.example.carservice.repository.ServiceRepository;
import com.example.carservice.repository.SpareRepository;
import com.example.carservice.repository.projection.CarNativeSearchProjection;
import com.example.carservice.service.impl.CarServiceImpl;
import com.example.carservice.service.impl.ClientServiceImpl;
import com.example.carservice.service.impl.MechanicServiceImpl;
import com.example.carservice.service.impl.OrderServiceImpl;
import com.example.carservice.service.impl.ServiceImplementation;
import com.example.carservice.service.impl.SpareServiceImpl;
import com.example.carservice.service.impl.cache.CarSearchCache;
import com.example.carservice.service.impl.cache.CarSearchCacheKey;
import com.example.carservice.service.impl.cache.CarSearchFilter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@ExtendWith(MockitoExtension.class)
@DisplayName("Тесты всех сервисов - 100% покрытие")
class AllServicesTest {

  @Mock private CarRepository carRepository;
  @Mock private ClientRepository clientRepository;
  @Mock private MechanicRepository mechanicRepository;
  @Mock private OrderRepository orderRepository;
  @Mock private ServiceRepository serviceRepository;
  @Mock private SpareRepository spareRepository;
  @Mock private CarBrandModelRepository carBrandModelRepository;
  @Mock private CarMapper carMapper;
  @Mock private ClientMapper clientMapper;
  @Mock private MechanicMapper mechanicMapper;
  @Mock private OrderMapper orderMapper;
  @Mock private CarSearchCache searchCache;
  @Mock private ServiceMapper serviceMapper;
  @Mock private SpareMapper spareMapper;

  @InjectMocks private CarServiceImpl carService;
  @InjectMocks private ClientServiceImpl clientService;
  @InjectMocks private MechanicServiceImpl mechanicService;
  @InjectMocks private OrderServiceImpl orderService;
  @InjectMocks private ServiceImplementation serviceImpl;
  @InjectMocks private SpareServiceImpl spareService;

  private Client testClient;
  private ClientDto testClientDto;
  private Car testCar;
  private CarDto testCarDto;
  private CarBrandModel testBrandModel;
  private Mechanic testMechanic;
  private MechanicDto testMechanicDto;
  private Order testOrder;
  private OrderDto testOrderDto;
  private ServiceEntity testService;
  private ServiceDto testServiceDto;
  private Spare testSpare;
  private SpareDto testSpareDto;

  @BeforeEach
  void setUp() {
    testClient = Client.builder()
        .id(1L).firstName("Иван").lastName("Петров")
        .phone("+375291234567").email("ivan@mail.ru")
        .address("Минск").registrationDate(LocalDate.now())
        .cars(new ArrayList<>()).build();

    testClientDto = new ClientDto();
    testClientDto.setId(1L);
    testClientDto.setFirstName("Иван");
    testClientDto.setLastName("Петров");
    testClientDto.setPhone("+375291234567");
    testClientDto.setEmail("ivan@mail.ru");
    testClientDto.setAddress("Минск");
    testClientDto.setRegistrationDate(LocalDate.now());

    testBrandModel = CarBrandModel.builder()
        .id(1L).brand("Toyota").model("Camry").build();

    testCar = Car.builder()
        .id(1L).brandModel(testBrandModel).client(testClient)
        .licensePlate("ABC123").vin("VIN123").year(2024).build();

    testCarDto = new CarDto();
    testCarDto.setId(1L);
    testCarDto.setBrand("Toyota");
    testCarDto.setModel("Camry");
    testCarDto.setLicensePlate("ABC123");
    testCarDto.setVin("VIN123");
    testCarDto.setYear(2024);
    testCarDto.setClientId(1L);

    testMechanic = Mechanic.builder()
        .id(1L).firstName("Сергей").lastName("Васильев")
        .phone("+375291112233").hireDate(LocalDate.now())
        .services(new HashSet<>()).build();

    testMechanicDto = MechanicDto.builder()
        .id(1L).firstName("Сергей").lastName("Васильев")
        .phone("+375291112233").hireDate(LocalDate.now())
        .serviceIds(new HashSet<>()).build();

    testService = ServiceEntity.builder()
        .id(1L).name("Замена масла").description("Замена масла")
        .price(100.0).durationMinutes(60).available(true).build();

    testServiceDto = ServiceDto.builder()
        .name("Замена масла").description("Замена масла")
        .price(100.0).duration("60 мин").build();

    testSpare = Spare.builder()
        .id(1L).name("Масляный фильтр").partNumber("OF-123")
        .price(15.0).quantityInStock(50).manufacturer("MANN").build();

    testSpareDto = SpareDto.builder()
        .id(1L).name("Масляный фильтр").partNumber("OF-123")
        .price(15.0).quantityInStock(50).manufacturer("MANN").build();

    testOrder = Order.builder()
        .id(1L).orderDate(LocalDateTime.now()).status("NEW")
        .totalPrice(115.0).description("Заказ").car(testCar)
        .services(new HashSet<>()).spares(new HashSet<>()).build();

    testOrderDto = OrderDto.builder()
        .id(1L).orderDate(LocalDateTime.now()).status("NEW")
        .totalPrice(115.0).description("Заказ").carId(1L)
        .serviceIds(new ArrayList<>()).spareIds(new ArrayList<>()).build();
  }

  private List<CarDto> createCarList(int count) {
    List<CarDto> cars = new ArrayList<>();
    for (int i = 0; i < count; i++) {
      CarDto car = new CarDto();
      car.setBrand("Toyota");
      car.setModel("Camry");
      car.setLicensePlate("CAR" + i);
      car.setVin("VIN" + i);
      car.setYear(2024);
      cars.add(car);
    }
    return cars;
  }

  private void setupBulkMocks() {
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carBrandModelRepository.findByBrandAndModel(any(), any()))
        .thenReturn(Optional.of(testBrandModel));
    when(carMapper.toEntity(any())).thenReturn(testCar);
    when(carRepository.save(any())).thenReturn(testCar);
    when(carMapper.toDto(any())).thenReturn(testCarDto);
  }

  @Test
  @DisplayName("CarService - getAllCars")
  void carService_getAllCars() {
    when(carRepository.findAll()).thenReturn(List.of(testCar));
    when(carMapper.toDto(testCar)).thenReturn(testCarDto);
    final List<CarDto> result = carService.getAllCars();
    assertEquals(1, result.size());
    verify(carRepository).findAll();
  }

  @Test
  @DisplayName("CarService - getCarById found")
  void carService_getCarById_Found() {
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(carMapper.toDto(testCar)).thenReturn(testCarDto);
    final CarDto result = carService.getCarById(1L);
    assertNotNull(result);
    assertEquals(1L, result.getId());
  }

  @Test
  @DisplayName("CarService - getCarById not found")
  void carService_getCarById_NotFound() {
    when(carRepository.findById(999L)).thenReturn(Optional.empty());
    final CarDto result = carService.getCarById(999L);
    assertNull(result);
  }

  @Test
  @DisplayName("CarService - getCarsByClient")
  void carService_getCarsByClient() {
    when(carRepository.findByClientId(1L)).thenReturn(List.of(testCar));
    when(carMapper.toDto(testCar)).thenReturn(testCarDto);
    final List<CarDto> result = carService.getCarsByClient(1L);
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("CarService - getCarsByClient пустой список")
  void carService_getCarsByClient_Empty() {
    when(carRepository.findByClientId(999L)).thenReturn(new ArrayList<>());
    final List<CarDto> result = carService.getCarsByClient(999L);
    assertTrue(result.isEmpty());
  }

  @Test
  @DisplayName("CarService - createCar success")
  void carService_createCar_Success() {
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carMapper.toEntity(testCarDto)).thenReturn(testCar);
    when(carRepository.save(testCar)).thenReturn(testCar);
    when(carMapper.toDto(testCar)).thenReturn(testCarDto);
    final CarDto result = carService.createCar(testCarDto);
    assertNotNull(result);
    verify(carRepository).save(testCar);
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - createCar with new brand")
  void carService_createCar_NewBrand() {
    final CarDto newBrandDto = new CarDto();
    newBrandDto.setBrand("NewBrand");
    newBrandDto.setModel("NewModel");
    newBrandDto.setLicensePlate("NEW123");
    newBrandDto.setVin("NEWVIN");
    newBrandDto.setYear(2024);
    newBrandDto.setClientId(1L);
    final CarBrandModel newBrandModel = CarBrandModel.builder()
        .id(2L).brand("NewBrand").model("NewModel").build();
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carBrandModelRepository.findByBrandAndModel("NewBrand", "NewModel"))
        .thenReturn(Optional.empty());
    when(carBrandModelRepository.save(any(CarBrandModel.class)))
        .thenReturn(newBrandModel);
    when(carMapper.toEntity(newBrandDto)).thenReturn(testCar);
    when(carRepository.save(testCar)).thenReturn(testCar);
    when(carMapper.toDto(testCar)).thenReturn(newBrandDto);
    final CarDto result = carService.createCar(newBrandDto);
    assertNotNull(result);
    verify(carBrandModelRepository).save(any(CarBrandModel.class));
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - createCar без клиента (clientId null)")
  void carService_createCar_WithoutClient() {
    final CarDto dtoWithoutClient = new CarDto();
    dtoWithoutClient.setBrand("Toyota");
    dtoWithoutClient.setModel("Camry");
    dtoWithoutClient.setLicensePlate("ABC123");
    dtoWithoutClient.setVin("VIN123");
    dtoWithoutClient.setYear(2024);
    dtoWithoutClient.setClientId(null);
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carMapper.toEntity(dtoWithoutClient)).thenReturn(testCar);
    when(carRepository.save(testCar)).thenReturn(testCar);
    when(carMapper.toDto(testCar)).thenReturn(dtoWithoutClient);
    final CarDto result = carService.createCar(dtoWithoutClient);
    assertNotNull(result);
    verify(clientRepository, never()).findById(any());
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - createCar клиент не найден")
  void carService_createCar_ClientNotFound() {
    final CarDto dto = new CarDto();
    dto.setClientId(999L);
    dto.setBrand("Toyota");
    dto.setModel("Camry");
    dto.setLicensePlate("ABC123");
    dto.setVin("VIN123");
    dto.setYear(2024);
    final Car carWithoutClient = Car.builder()
        .brandModel(testBrandModel)
        .client(null)
        .licensePlate("ABC123")
        .vin("VIN123")
        .year(2024)
        .build();
    when(clientRepository.findById(999L)).thenReturn(Optional.empty());
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carMapper.toEntity(dto)).thenReturn(carWithoutClient);
    assertThrows(RuntimeException.class, () -> carService.createCar(dto));
    verify(clientRepository).findById(999L);
  }

  @Test
  @DisplayName("CarService - updateCar success")
  void carService_updateCar_Success() {
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carRepository.save(testCar)).thenReturn(testCar);
    when(carMapper.toDto(testCar)).thenReturn(testCarDto);
    final CarDto result = carService.updateCar(1L, testCarDto);
    assertNotNull(result);
    verify(carRepository).save(testCar);
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - updateCar без клиента (clientId null)")
  void carService_updateCar_RemoveClient() {
    final CarDto updateDto = new CarDto();
    updateDto.setBrand("Toyota");
    updateDto.setModel("Camry");
    updateDto.setLicensePlate("NEW123");
    updateDto.setVin("NEWVIN");
    updateDto.setYear(2025);
    updateDto.setClientId(null);
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carRepository.save(testCar)).thenReturn(testCar);
    when(carMapper.toDto(testCar)).thenReturn(updateDto);
    final CarDto result = carService.updateCar(1L, updateDto);
    assertNotNull(result);
    assertNull(testCar.getClient());
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - updateCar машина не найдена")
  void carService_updateCar_NotFound() {
    when(carRepository.findById(999L)).thenReturn(Optional.empty());
    assertThrows(RuntimeException.class, () -> carService.updateCar(999L, testCarDto));
  }

  @Test
  @DisplayName("CarService - updateCar клиент не найден")
  void carService_updateCar_ClientNotFound() {
    final CarDto updateDto = new CarDto();
    updateDto.setClientId(999L);
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(clientRepository.findById(999L)).thenReturn(Optional.empty());
    assertThrows(RuntimeException.class, () -> carService.updateCar(1L, updateDto));
  }

  @Test
  @DisplayName("CarService - updateCar создаёт новую CarBrandModel")
  void carService_updateCar_CreatesNewBrandModel() {
    final CarDto updateDto = new CarDto();
    updateDto.setBrand("NewBrand");
    updateDto.setModel("NewModel");
    updateDto.setLicensePlate("NEW123");
    updateDto.setVin("NEWVIN");
    updateDto.setYear(2025);
    updateDto.setClientId(1L);
    final CarBrandModel newBrandModel = CarBrandModel.builder()
        .id(2L).brand("NewBrand").model("NewModel").build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(carBrandModelRepository.findByBrandAndModel("NewBrand", "NewModel"))
        .thenReturn(Optional.empty());
    when(carBrandModelRepository.save(any(CarBrandModel.class)))
        .thenReturn(newBrandModel);
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carRepository.save(testCar)).thenReturn(testCar);
    when(carMapper.toDto(testCar)).thenReturn(updateDto);
    final CarDto result = carService.updateCar(1L, updateDto);
    assertNotNull(result);
    verify(carBrandModelRepository).save(any(CarBrandModel.class));
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - deleteCar success")
  void carService_deleteCar_Success() {
    doNothing().when(carRepository).deleteById(1L);
    carService.deleteCar(1L);
    verify(carRepository).deleteById(1L);
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsSafe success")
  void carService_bulkCreateCarsSafe_Success() {
    final List<CarDto> cars = createCarList(5);
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(1L).cars(cars).build();
    setupBulkMocks();
    final BulkCarCreateResult result = carService.bulkCreateCarsSafe(request);
    assertEquals(5, result.getSuccessfullyCreated());
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsSafe клиент не найден")
  void carService_bulkCreateCarsSafe_ClientNotFound() {
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(999L).cars(List.of(testCarDto)).build();
    when(clientRepository.findById(999L)).thenReturn(Optional.empty());
    assertThrows(RuntimeException.class, () -> carService.bulkCreateCarsSafe(request));
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsSafe ошибка на 10-й машине (полный откат)")
  void carService_bulkCreateCarsSafe_ErrorOnTenthCar() {
    final List<CarDto> cars = createCarList(10);
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(1L).cars(cars).build();
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carBrandModelRepository.findByBrandAndModel(any(), any()))
        .thenReturn(Optional.of(testBrandModel));
    when(carMapper.toEntity(any())).thenReturn(testCar);
    when(carRepository.save(any())).thenReturn(testCar);
    when(carMapper.toDto(any())).thenReturn(testCarDto);
    final RuntimeException exception = assertThrows(RuntimeException.class,
        () -> carService.bulkCreateCarsSafe(request));
    assertTrue(exception.getMessage().contains("SAFE mode"));
    verify(searchCache, never()).invalidateAll();
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsUnsafe success")
  void carService_bulkCreateCarsUnsafe_Success() {
    final List<CarDto> cars = createCarList(5);
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(1L).cars(cars).build();
    setupBulkMocks();
    final BulkCarCreateResult result = carService.bulkCreateCarsUnsafe(request);
    assertEquals(5, result.getSuccessfullyCreated());
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsUnsafe клиент не найден")
  void carService_bulkCreateCarsUnsafe_ClientNotFound() {
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(999L).cars(List.of(testCarDto)).build();
    when(clientRepository.findById(999L)).thenReturn(Optional.empty());
    assertThrows(RuntimeException.class, () -> carService.bulkCreateCarsUnsafe(request));
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsUnsafe ошибка на 10-й машине (частичное сохранение)")
  void carService_bulkCreateCarsUnsafe_ErrorOnTenthCar() {
    final List<CarDto> cars = createCarList(10);
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(1L).cars(cars).build();
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carBrandModelRepository.findByBrandAndModel(any(), any()))
        .thenReturn(Optional.of(testBrandModel));
    when(carMapper.toEntity(any())).thenReturn(testCar);
    when(carRepository.save(any())).thenReturn(testCar);
    when(carMapper.toDto(any())).thenReturn(testCarDto);
    final BulkCarCreateResult result = carService.bulkCreateCarsUnsafe(request);
    assertEquals(10, result.getTotalRequested());
    assertEquals(9, result.getSuccessfullyCreated());
    assertEquals(1, result.getFailed());
    verify(searchCache, never()).invalidateAll();
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsUnsafe ошибка в середине списка")
  void carService_bulkCreateCarsUnsafe_ErrorInMiddle() {
    final List<CarDto> cars = createCarList(5);
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(1L).cars(cars).build();
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carMapper.toEntity(any())).thenReturn(testCar);
    when(carRepository.save(any()))
        .thenReturn(testCar)
        .thenReturn(testCar)
        .thenThrow(new RuntimeException("DB error"))
        .thenReturn(testCar)
        .thenReturn(testCar);
    when(carMapper.toDto(any())).thenReturn(testCarDto);
    final BulkCarCreateResult result = carService.bulkCreateCarsUnsafe(request);
    assertEquals(5, result.getTotalRequested());
    assertEquals(4, result.getSuccessfullyCreated());
    assertEquals(1, result.getFailed());
    verify(searchCache, never()).invalidateAll();
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsSafe с пустым списком машин")
  void carService_bulkCreateCarsSafe_EmptyList() {
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(1L).cars(List.of()).build();
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    final BulkCarCreateResult result = carService.bulkCreateCarsSafe(request);
    assertEquals(0, result.getTotalRequested());
    verify(carRepository, never()).save(any());
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsUnsafe с пустым списком машин")
  void carService_bulkCreateCarsUnsafe_EmptyList() {
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(1L).cars(List.of()).build();
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    final BulkCarCreateResult result = carService.bulkCreateCarsUnsafe(request);
    assertEquals(0, result.getTotalRequested());
    verify(carRepository, never()).save(any());
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsSafe создание новой CarBrandModel")
  void carService_bulkCreateCarsSafe_CreatesNewBrandModel() {
    final CarDto car = new CarDto();
    car.setBrand("NewBrand");
    car.setModel("NewModel");
    car.setLicensePlate("NEW123");
    car.setVin("NEWVIN");
    car.setYear(2024);
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(1L).cars(List.of(car)).build();
    final CarBrandModel newBrandModel = CarBrandModel.builder()
        .id(2L).brand("NewBrand").model("NewModel").build();
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carBrandModelRepository.findByBrandAndModel("NewBrand", "NewModel"))
        .thenReturn(Optional.empty());
    when(carBrandModelRepository.save(any(CarBrandModel.class)))
        .thenReturn(newBrandModel);
    when(carMapper.toEntity(any())).thenReturn(testCar);
    when(carRepository.save(any())).thenReturn(testCar);
    when(carMapper.toDto(any())).thenReturn(testCarDto);
    final BulkCarCreateResult result = carService.bulkCreateCarsSafe(request);
    assertEquals(1, result.getSuccessfullyCreated());
    verify(carBrandModelRepository).save(any(CarBrandModel.class));
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - bulkCreateCarsUnsafe создание новой CarBrandModel")
  void carService_bulkCreateCarsUnsafe_CreatesNewBrandModel() {
    final CarDto car = new CarDto();
    car.setBrand("NewBrand");
    car.setModel("NewModel");
    car.setLicensePlate("NEW123");
    car.setVin("NEWVIN");
    car.setYear(2024);
    final BulkCarCreateRequest request = BulkCarCreateRequest.builder()
        .clientId(1L).cars(List.of(car)).build();
    final CarBrandModel newBrandModel = CarBrandModel.builder()
        .id(2L).brand("NewBrand").model("NewModel").build();
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carBrandModelRepository.findByBrandAndModel("NewBrand", "NewModel"))
        .thenReturn(Optional.empty());
    when(carBrandModelRepository.save(any(CarBrandModel.class)))
        .thenReturn(newBrandModel);
    when(carMapper.toEntity(any())).thenReturn(testCar);
    when(carRepository.save(any())).thenReturn(testCar);
    when(carMapper.toDto(any())).thenReturn(testCarDto);
    final BulkCarCreateResult result = carService.bulkCreateCarsUnsafe(request);
    assertEquals(1, result.getSuccessfullyCreated());
    verify(carBrandModelRepository).save(any(CarBrandModel.class));
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("CarService - searchCarsJpql с кэшем")
  void carService_searchCarsJpql_WithCache() {
    final CarSearchFilter filter = new CarSearchFilter("Toyota", null, null, null, null, null);
    final Pageable pageable = PageRequest.of(0, 10);
    final Page<CarDto> cachedPage = new PageImpl<>(List.of(testCarDto));
    when(searchCache.get(any())).thenReturn(cachedPage);
    final Page<CarDto> result = carService.searchCarsJpql(filter, pageable);
    assertNotNull(result);
    verify(searchCache).get(any());
    verify(carRepository, never()).searchCarsJpql(
        any(), any(), any(), any(), any(), any(), any());
  }

  @Test
  @DisplayName("CarService - searchCarsJpql без кэша (первый запрос)")
  void carService_searchCarsJpql_FirstCall() {
    final CarSearchFilter filter = new CarSearchFilter("Toyota", null, null, null, null, null);
    final Pageable pageable = PageRequest.of(0, 10);
    final Page<Car> carPage = new PageImpl<>(List.of(testCar));
    when(searchCache.get(any())).thenReturn(null);
    when(carRepository.searchCarsJpql(any(), any(), any(), any(), any(), any(), any()))
        .thenReturn(carPage);
    when(carMapper.toDto(testCar)).thenReturn(testCarDto);
    final Page<CarDto> result = carService.searchCarsJpql(filter, pageable);
    assertNotNull(result);
    verify(searchCache).put(any(), any());
  }

  @Test
  @DisplayName("CarService - searchCarsNative с кэшем")
  void carService_searchCarsNative_WithCache() {
    final CarSearchFilter filter = new CarSearchFilter("Toyota", null, null, null, null, null);
    final Pageable pageable = PageRequest.of(0, 10);
    final Page<CarDto> cachedPage = new PageImpl<>(List.of(testCarDto));
    when(searchCache.get(any())).thenReturn(cachedPage);
    final Page<CarDto> result = carService.searchCarsNative(filter, pageable);
    assertNotNull(result);
    verify(searchCache).get(any());
    verify(carRepository, never()).searchCarsNativeProjection(
        any(), any(), any(), any(), any(), any(), any());
  }

  @Test
  @DisplayName("CarService - searchCarsNative без кэша (первый запрос)")
  void carService_searchCarsNative_FirstCall() {
    final CarSearchFilter filter = new CarSearchFilter("Toyota", null, null, null, null, null);
    final Pageable pageable = PageRequest.of(0, 10);
    final Page<CarNativeSearchProjection> projectionPage = new PageImpl<>(new ArrayList<>());
    when(searchCache.get(any())).thenReturn(null);
    when(carRepository.searchCarsNativeProjection(
        any(), any(), any(), any(), any(), any(), any()))
        .thenReturn(projectionPage);
    final Page<CarDto> result = carService.searchCarsNative(filter, pageable);
    assertNotNull(result);
    verify(searchCache).put(any(), any());
  }

  @Test
  @DisplayName("CarService - searchCarsJpql с детальными параметрами")
  void carService_searchCarsJpql_WithDetailedParams() {
    final CarSearchFilter filter = new CarSearchFilter(
        "Toyota", "Camry", "Ivan", "Petrov", 2020, 2025);
    final Pageable pageable = PageRequest.of(0, 10);
    final Page<Car> carPage = new PageImpl<>(List.of(testCar), pageable, 1);
    when(searchCache.get(any(CarSearchCacheKey.class))).thenReturn(null);
    when(carRepository.searchCarsJpql(
        "toyota", "camry", "ivan", "petrov", 2020, 2025, pageable))
        .thenReturn(carPage);
    when(carMapper.toDto(testCar)).thenReturn(testCarDto);
    final Page<CarDto> result = carService.searchCarsJpql(filter, pageable);
    assertNotNull(result);
    verify(searchCache).put(any(CarSearchCacheKey.class), any(Page.class));
  }

  @Test
  @DisplayName("CarService - searchCarsNative с детальными параметрами")
  void carService_searchCarsNative_WithDetailedParams() {
    final CarSearchFilter filter = new CarSearchFilter("BMW", "X5", null, null, null, null);
    final Pageable pageable = PageRequest.of(0, 10);
    final CarNativeSearchProjection projection = mock(CarNativeSearchProjection.class);
    when(projection.getId()).thenReturn(1L);
    when(projection.getBrand()).thenReturn("BMW");
    when(projection.getModel()).thenReturn("X5");
    when(projection.getLicensePlate()).thenReturn("ABC123");
    when(projection.getVin()).thenReturn("VIN123");
    when(projection.getYear()).thenReturn(2024);
    when(projection.getClientId()).thenReturn(1L);
    when(projection.getClientName()).thenReturn("Ivan Petrov");
    final Page<CarNativeSearchProjection> projectionPage =
        new PageImpl<>(List.of(projection), pageable, 1);
    when(searchCache.get(any(CarSearchCacheKey.class))).thenReturn(null);
    when(carRepository.searchCarsNativeProjection(
        "bmw", "x5", "", "", null, null, pageable))
        .thenReturn(projectionPage);
    final Page<CarDto> result = carService.searchCarsNative(filter, pageable);
    assertNotNull(result);
    verify(searchCache).put(any(CarSearchCacheKey.class), any(Page.class));
  }

  @Test
  @DisplayName("ClientService - getAllClients")
  void clientService_getAllClients() {
    when(clientRepository.findAll()).thenReturn(List.of(testClient));
    when(clientMapper.toDto(testClient)).thenReturn(testClientDto);
    final List<ClientDto> result = clientService.getAllClients();
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("ClientService - getClientById found")
  void clientService_getClientById_Found() {
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(clientMapper.toDto(testClient)).thenReturn(testClientDto);
    final ClientDto result = clientService.getClientById(1L);
    assertNotNull(result);
  }

  @Test
  @DisplayName("ClientService - getClientById not found")
  void clientService_getClientById_NotFound() {
    when(clientRepository.findById(999L)).thenReturn(Optional.empty());
    assertThrows(ResourceNotFoundException.class, () -> clientService.getClientById(999L));
  }

  @Test
  @DisplayName("ClientService - getClientByPhone found")
  void clientService_getClientByPhone_Found() {
    when(clientRepository.findByPhone("+375291234567"))
        .thenReturn(Optional.of(testClient));
    when(clientMapper.toDto(testClient)).thenReturn(testClientDto);
    final ClientDto result = clientService.getClientByPhone("+375291234567");
    assertNotNull(result);
  }

  @Test
  @DisplayName("ClientService - getClientByPhone не найден")
  void clientService_getClientByPhone_NotFound() {
    when(clientRepository.findByPhone("+375299999999")).thenReturn(Optional.empty());
    assertThrows(ResourceNotFoundException.class,
        () -> clientService.getClientByPhone("+375299999999"));
  }

  @Test
  @DisplayName("ClientService - getClientsByLastName")
  void clientService_getClientsByLastName() {
    when(clientRepository.findByLastName("Петров")).thenReturn(List.of(testClient));
    when(clientMapper.toDto(testClient)).thenReturn(testClientDto);
    final List<ClientDto> result = clientService.getClientsByLastName("Петров");
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("ClientService - getClientsByLastName пустой список")
  void clientService_getClientsByLastName_Empty() {
    when(clientRepository.findByLastName("Несуществующий")).thenReturn(new ArrayList<>());
    final List<ClientDto> result = clientService.getClientsByLastName("Несуществующий");
    assertTrue(result.isEmpty());
  }

  @Test
  @DisplayName("ClientService - createClient success")
  void clientService_createClient_Success() {
    when(clientMapper.toEntity(testClientDto)).thenReturn(testClient);
    when(clientRepository.save(testClient)).thenReturn(testClient);
    when(clientMapper.toDto(testClient)).thenReturn(testClientDto);
    final ClientDto result = clientService.createClient(testClientDto);
    assertNotNull(result);
    verify(clientRepository).save(testClient);
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("ClientService - updateClient success")
  void clientService_updateClient_Success() {
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(clientRepository.save(testClient)).thenReturn(testClient);
    when(clientMapper.toDto(testClient)).thenReturn(testClientDto);
    final ClientDto result = clientService.updateClient(1L, testClientDto);
    assertNotNull(result);
    verify(clientRepository).save(testClient);
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("ClientService - updateClient не найден")
  void clientService_updateClient_NotFound() {
    when(clientRepository.findById(999L)).thenReturn(Optional.empty());
    assertThrows(ResourceNotFoundException.class,
        () -> clientService.updateClient(999L, testClientDto));
  }

  @Test
  @DisplayName("ClientService - deleteClient success")
  void clientService_deleteClient_Success() {
    testClient.setCars(new ArrayList<>());
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    doNothing().when(clientRepository).delete(testClient);
    clientService.deleteClient(1L);
    verify(clientRepository).delete(testClient);
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("ClientService - deleteClient не найден")
  void clientService_deleteClient_NotFound() {
    when(clientRepository.findById(999L)).thenReturn(Optional.empty());
    assertThrows(ResourceNotFoundException.class, () -> clientService.deleteClient(999L));
  }

  @Test
  @DisplayName("ClientService - deleteClient с машинами")
  void clientService_deleteClient_WithCars() {
    testClient.setCars(List.of(testCar));
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(carRepository.save(any(Car.class))).thenReturn(testCar);
    doNothing().when(clientRepository).delete(testClient);
    clientService.deleteClient(1L);
    verify(carRepository, times(1)).save(any(Car.class));
    verify(clientRepository).delete(testClient);
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("ClientService - createClientWithNewCarsWithoutTransaction ошибка на 2й машине")
  void clientService_createClientWithNewCarsWithoutTransaction_ErrorOnSecond() {
    final CarDto car1 = new CarDto();
    car1.setBrand("Toyota");
    car1.setModel("Camry");
    car1.setLicensePlate("CAR001");
    car1.setVin("VIN001");
    final CarDto car2 = new CarDto();
    car2.setBrand("Toyota");
    car2.setModel("Camry");
    car2.setLicensePlate("CAR002");
    car2.setVin("VIN002");
    testClientDto.setCars(List.of(car1, car2));
    when(clientMapper.toEntity(testClientDto)).thenReturn(testClient);
    when(clientRepository.save(testClient)).thenReturn(testClient);
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carRepository.save(any(Car.class))).thenReturn(testCar);
    assertThrows(RuntimeException.class, () ->
        clientService.createClientWithNewCarsWithoutTransaction(testClientDto));
    verify(carRepository, times(1)).save(any(Car.class));
  }

  @Test
  @DisplayName("ClientService - createClientWithNewCarsWithTransaction ошибка на 2й машине (откат)")
  void clientService_createClientWithNewCarsWithTransaction_ErrorOnSecond() {
    final CarDto car1 = new CarDto();
    car1.setBrand("Toyota");
    car1.setModel("Camry");
    car1.setLicensePlate("CAR001");
    car1.setVin("VIN001");
    final CarDto car2 = new CarDto();
    car2.setBrand("Toyota");
    car2.setModel("Camry");
    car2.setLicensePlate("CAR002");
    car2.setVin("VIN002");
    testClientDto.setCars(List.of(car1, car2));
    when(clientMapper.toEntity(testClientDto)).thenReturn(testClient);
    when(clientRepository.save(testClient)).thenReturn(testClient);
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carRepository.save(any(Car.class))).thenReturn(testCar);
    assertThrows(RuntimeException.class, () ->
        clientService.createClientWithNewCarsWithTransaction(testClientDto));
    verify(carRepository, atLeastOnce()).save(any(Car.class));
  }

  @Test
  @DisplayName("ClientService - createClientWithNewCarsWithoutTransaction успех (1 машина)")
  void clientService_createClientWithoutTransaction_OneCarSuccess() {
    final CarDto carDto = new CarDto();
    carDto.setBrand("Toyota");
    carDto.setModel("Camry");
    carDto.setLicensePlate("CAR001");
    carDto.setVin("VIN001");
    carDto.setYear(2024);
    testClientDto.setCars(List.of(carDto));
    when(clientMapper.toEntity(testClientDto)).thenReturn(testClient);
    when(clientRepository.save(testClient)).thenReturn(testClient);
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carRepository.save(any(Car.class))).thenReturn(testCar);
    clientService.createClientWithNewCarsWithoutTransaction(testClientDto);
    verify(clientRepository).save(testClient);
    verify(carRepository).save(any(Car.class));
  }

  @Test
  @DisplayName("ClientService - createClientWithNewCarsWithTransaction успех (1 машина)")
  void clientService_createClientWithTransaction_OneCarSuccess() {
    final CarDto carDto = new CarDto();
    carDto.setBrand("Toyota");
    carDto.setModel("Camry");
    carDto.setLicensePlate("CAR001");
    carDto.setVin("VIN001");
    carDto.setYear(2024);
    testClientDto.setCars(List.of(carDto));
    when(clientMapper.toEntity(testClientDto)).thenReturn(testClient);
    when(clientRepository.save(testClient)).thenReturn(testClient);
    when(carBrandModelRepository.findByBrandAndModel("Toyota", "Camry"))
        .thenReturn(Optional.of(testBrandModel));
    when(carRepository.save(any(Car.class))).thenReturn(testCar);
    clientService.createClientWithNewCarsWithTransaction(testClientDto);
    verify(clientRepository).save(testClient);
    verify(carRepository).save(any(Car.class));
  }

  @Test
  @DisplayName("ClientService - createClientWithNewCarsWithoutTransaction пустой список машин")
  void clientService_createClientWithoutTransaction_EmptyCars() {
    testClientDto.setCars(List.of());
    when(clientMapper.toEntity(testClientDto)).thenReturn(testClient);
    when(clientRepository.save(testClient)).thenReturn(testClient);
    clientService.createClientWithNewCarsWithoutTransaction(testClientDto);
    verify(clientRepository).save(testClient);
    verify(carRepository, never()).save(any());
  }

  @Test
  @DisplayName("ClientService - createClientWithNewCarsWithTransaction пустой список машин")
  void clientService_createClientWithTransaction_EmptyCars() {
    testClientDto.setCars(List.of());
    when(clientMapper.toEntity(testClientDto)).thenReturn(testClient);
    when(clientRepository.save(testClient)).thenReturn(testClient);
    clientService.createClientWithNewCarsWithTransaction(testClientDto);
    verify(clientRepository).save(testClient);
    verify(carRepository, never()).save(any());
  }

  @Test
  @DisplayName("ClientService - buildCar выбрасывает исключение если CarBrandModel не найден")
  void clientService_buildCar_ThrowsExceptionWhenBrandModelNotFound() {
    final CarDto carDto = new CarDto();
    carDto.setBrand("UnknownBrand");
    carDto.setModel("UnknownModel");
    carDto.setLicensePlate("CAR001");
    carDto.setVin("VIN001");
    carDto.setYear(2024);
    testClientDto.setCars(List.of(carDto));
    when(clientMapper.toEntity(testClientDto)).thenReturn(testClient);
    when(clientRepository.save(testClient)).thenReturn(testClient);
    when(carBrandModelRepository.findByBrandAndModel("UnknownBrand", "UnknownModel"))
        .thenReturn(Optional.empty());
    final TransactionDemoException exception = assertThrows(TransactionDemoException.class,
        () -> clientService.createClientWithNewCarsWithoutTransaction(testClientDto));
    assertTrue(exception.getMessage().contains("CarBrandModel не найден"));
  }

  @Test
  @DisplayName("ClientService - updateClient обновляет все поля корректно")
  void clientService_updateClient_UpdatesAllFields() {
    final ClientDto updateDto = new ClientDto();
    updateDto.setFirstName("NewFirstName");
    updateDto.setLastName("NewLastName");
    updateDto.setPhone("+375299999999");
    updateDto.setEmail("newemail@test.com");
    updateDto.setAddress("New Address");
    updateDto.setRegistrationDate(LocalDate.of(2023, 1, 1));
    when(clientRepository.findById(1L)).thenReturn(Optional.of(testClient));
    when(clientRepository.save(testClient)).thenReturn(testClient);
    when(clientMapper.toDto(testClient)).thenReturn(updateDto);
    final ClientDto result = clientService.updateClient(1L, updateDto);
    assertNotNull(result);
    assertEquals("NewFirstName", testClient.getFirstName());
    assertEquals("NewLastName", testClient.getLastName());
    verify(searchCache).invalidateAll();
  }

  @Test
  @DisplayName("MechanicService - getAllMechanics")
  void mechanicService_getAllMechanics() {
    when(mechanicRepository.findAll()).thenReturn(List.of(testMechanic));
    when(mechanicMapper.toDto(testMechanic)).thenReturn(testMechanicDto);
    final List<MechanicDto> result = mechanicService.getAllMechanics();
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("MechanicService - getMechanicById found")
  void mechanicService_getMechanicById_Found() {
    when(mechanicRepository.findById(1L)).thenReturn(Optional.of(testMechanic));
    when(mechanicMapper.toDto(testMechanic)).thenReturn(testMechanicDto);
    final MechanicDto result = mechanicService.getMechanicById(1L);
    assertNotNull(result);
  }

  @Test
  @DisplayName("MechanicService - createMechanic success")
  void mechanicService_createMechanic_Success() {
    when(mechanicMapper.toEntity(testMechanicDto)).thenReturn(testMechanic);
    when(mechanicRepository.save(testMechanic)).thenReturn(testMechanic);
    when(mechanicMapper.toDto(testMechanic)).thenReturn(testMechanicDto);
    final MechanicDto result = mechanicService.createMechanic(testMechanicDto);
    assertNotNull(result);
    verify(mechanicRepository).save(testMechanic);
  }

  @Test
  @DisplayName("MechanicService - updateMechanic success")
  void mechanicService_updateMechanic_Success() {
    when(mechanicRepository.findById(1L)).thenReturn(Optional.of(testMechanic));
    when(mechanicRepository.save(testMechanic)).thenReturn(testMechanic);
    when(mechanicMapper.toDto(testMechanic)).thenReturn(testMechanicDto);
    final MechanicDto result = mechanicService.updateMechanic(1L, testMechanicDto);
    assertNotNull(result);
    verify(mechanicRepository).save(testMechanic);
  }

  @Test
  @DisplayName("MechanicService - deleteMechanic success")
  void mechanicService_deleteMechanic_Success() {
    doNothing().when(mechanicRepository).deleteById(1L);
    mechanicService.deleteMechanic(1L);
    verify(mechanicRepository).deleteById(1L);
  }

  @Test
  @DisplayName("OrderService - getAllOrders")
  void orderService_getAllOrders() {
    when(orderRepository.findAll()).thenReturn(List.of(testOrder));
    when(orderMapper.toDto(testOrder)).thenReturn(testOrderDto);
    final List<OrderDto> result = orderService.getAllOrders();
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("OrderService - getOrderById found")
  void orderService_getOrderById_Found() {
    when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
    when(orderMapper.toDto(testOrder)).thenReturn(testOrderDto);
    final OrderDto result = orderService.getOrderById(1L);
    assertNotNull(result);
  }

  @Test
  @DisplayName("OrderService - getOrderById не найден")
  void orderService_getOrderById_NotFound() {
    when(orderRepository.findById(999L)).thenReturn(Optional.empty());
    assertThrows(OrderNotFoundException.class, () -> orderService.getOrderById(999L));
  }

  @Test
  @DisplayName("OrderService - getOrdersByCar")
  void orderService_getOrdersByCar() {
    when(orderRepository.findByCarId(1L)).thenReturn(List.of(testOrder));
    when(orderMapper.toDto(testOrder)).thenReturn(testOrderDto);
    final List<OrderDto> result = orderService.getOrdersByCar(1L);
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("OrderService - getOrdersByClient")
  void orderService_getOrdersByClient() {
    when(orderRepository.findByClientId(1L)).thenReturn(List.of(testOrder));
    when(orderMapper.toDto(testOrder)).thenReturn(testOrderDto);
    final List<OrderDto> result = orderService.getOrdersByClient(1L);
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("OrderService - getOrdersByStatus")
  void orderService_getOrdersByStatus() {
    when(orderRepository.findByStatus("NEW")).thenReturn(List.of(testOrder));
    when(orderMapper.toDto(testOrder)).thenReturn(testOrderDto);
    final List<OrderDto> result = orderService.getOrdersByStatus("NEW");
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("OrderService - getOrdersByDateRange")
  void orderService_getOrdersByDateRange() {
    final LocalDateTime start = LocalDateTime.now().minusDays(7);
    final LocalDateTime end = LocalDateTime.now();
    when(orderRepository.findByOrderDateBetween(start, end)).thenReturn(List.of(testOrder));
    when(orderMapper.toDto(testOrder)).thenReturn(testOrderDto);
    final List<OrderDto> result = orderService.getOrdersByDateRange(start, end);
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("OrderService - createOrder success")
  void orderService_createOrder_Success() {
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderMapper.toEntity(testOrderDto)).thenReturn(testOrder);
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(testOrderDto);
    final OrderDto result = orderService.createOrder(testOrderDto);
    assertNotNull(result);
    verify(orderRepository).save(testOrder);
  }

  @Test
  @DisplayName("OrderService - createOrder с сервисами и запчастями")
  void orderService_createOrder_WithServicesAndSpares() {
    final OrderDto dtoWithItems = OrderDto.builder()
        .carId(1L)
        .serviceIds(List.of(1L))
        .spareIds(List.of(1L))
        .status("NEW")
        .build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(serviceRepository.findAllById(List.of(1L))).thenReturn(List.of(testService));
    when(spareRepository.findAllById(List.of(1L))).thenReturn(List.of(testSpare));
    when(orderMapper.toEntity(dtoWithItems)).thenReturn(testOrder);
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(dtoWithItems);
    final OrderDto result = orderService.createOrder(dtoWithItems);
    assertNotNull(result);
    verify(orderRepository).save(testOrder);
  }

  @Test
  @DisplayName("OrderService - createOrder с null orderDate и status (устанавливаются дефолтные)")
  void orderService_createOrder_SetsDefaultOrderDateAndStatus() {
    final OrderDto dto = OrderDto.builder().carId(1L).totalPrice(100.0).build();
    final Order orderToSave = Order.builder()
        .car(testCar).orderDate(null).status(null)
        .services(new HashSet<>()).spares(new HashSet<>()).build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderMapper.toEntity(dto)).thenReturn(orderToSave);
    when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
      final Order saved = invocation.getArgument(0);
      saved.setId(1L);
      assertNotNull(saved.getOrderDate());
      assertEquals("NEW", saved.getStatus());
      return saved;
    });
    when(orderMapper.toDto(any(Order.class))).thenReturn(dto);
    final OrderDto result = orderService.createOrder(dto);
    assertNotNull(result);
  }

  @Test
  @DisplayName("OrderService - updateOrder success")
  void orderService_updateOrder_Success() {
    final OrderDto updateDto = OrderDto.builder()
        .description("Обновлённое описание")
        .status("IN_PROGRESS")
        .totalPrice(200.0)
        .carId(1L)
        .build();
    when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(updateDto);
    final OrderDto result = orderService.updateOrder(1L, updateDto);
    assertNotNull(result);
    verify(orderRepository).save(testOrder);
  }

  @Test
  @DisplayName("OrderService - cancelOrder success")
  void orderService_cancelOrder_Success() {
    when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(testOrderDto);
    final OrderDto result = orderService.cancelOrder(1L);
    assertNotNull(result);
    assertEquals("CANCELLED", testOrder.getStatus());
  }

  @Test
  @DisplayName("OrderService - completeOrder success")
  void orderService_completeOrder_Success() {
    when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(testOrderDto);
    final OrderDto result = orderService.completeOrder(1L);
    assertNotNull(result);
    assertEquals("COMPLETED", testOrder.getStatus());
    assertNotNull(testOrder.getCompletionDate());
  }

  @Test
  @DisplayName("OrderService - deleteOrder success")
  void orderService_deleteOrder_Success() {
    when(orderRepository.existsById(1L)).thenReturn(true);
    doNothing().when(orderRepository).deleteById(1L);
    orderService.deleteOrder(1L);
    verify(orderRepository).deleteById(1L);
  }

  @Test
  @DisplayName("OrderService - deleteOrder не найден")
  void orderService_deleteOrder_NotFound() {
    when(orderRepository.existsById(999L)).thenReturn(false);
    assertThrows(ResourceNotFoundException.class, () -> orderService.deleteOrder(999L));
  }

  @Test
  @DisplayName("OrderService - createOrderWithoutTransaction демо")
  void orderService_createOrderWithoutTransaction_Demo() {
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderMapper.toEntity(testOrderDto)).thenReturn(testOrder);
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    assertThrows(OrderOperationException.class, () ->
        orderService.createOrderWithoutTransaction(testOrderDto));
    verify(orderRepository).save(testOrder);
  }

  @Test
  @DisplayName("OrderService - createOrderWithTransaction демо")
  void orderService_createOrderWithTransaction_Demo() {
    final OrderDto dto = OrderDto.builder()
        .carId(1L)
        .serviceIds(List.of(1L))
        .build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderMapper.toEntity(dto)).thenReturn(testOrder);
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(serviceRepository.findAllById(List.of(1L))).thenReturn(List.of(testService));
    assertThrows(OrderOperationException.class, () ->
        orderService.createOrderWithTransaction(dto));
  }

  @Test
  @DisplayName("OrderService - demonstrateNplus1Problem не выбрасывает исключений")
  void orderService_demonstrateNplus1Problem_NoException() {
    when(orderRepository.findAll()).thenReturn(List.of(testOrder));
    when(orderRepository.findAllWithDetails()).thenReturn(List.of(testOrder));
    assertDoesNotThrow(() -> orderService.demonstrateNplus1Problem());
  }

  @Test
  @DisplayName("ServiceInterface - getAllServices")
  void serviceInterface_getAllServices() {
    when(serviceRepository.findAll()).thenReturn(List.of(testService));
    when(serviceMapper.toDto(testService)).thenReturn(testServiceDto);
    final List<ServiceDto> result = serviceImpl.getAllServices();
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("ServiceInterface - getServiceById found")
  void serviceInterface_getServiceById_Found() {
    when(serviceRepository.findById(1L)).thenReturn(Optional.of(testService));
    when(serviceMapper.toDto(testService)).thenReturn(testServiceDto);
    final ServiceDto result = serviceImpl.getServiceById(1L);
    assertNotNull(result);
  }

  @Test
  @DisplayName("ServiceInterface - getServicesByCategory")
  void serviceInterface_getServicesByCategory() {
    when(serviceRepository.findByCategoryName("Maintenance")).thenReturn(List.of(testService));
    when(serviceMapper.toDto(testService)).thenReturn(testServiceDto);
    final List<ServiceDto> result = serviceImpl.getServicesByCategory("Maintenance");
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("SpareService - getAllSpares")
  void spareService_getAllSpares() {
    when(spareRepository.findAll()).thenReturn(List.of(testSpare));
    when(spareMapper.toDto(testSpare)).thenReturn(testSpareDto);
    final List<SpareDto> result = spareService.getAllSpares();
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("SpareService - getSpareById found")
  void spareService_getSpareById_Found() {
    when(spareRepository.findById(1L)).thenReturn(Optional.of(testSpare));
    when(spareMapper.toDto(testSpare)).thenReturn(testSpareDto);
    final SpareDto result = spareService.getSpareById(1L);
    assertNotNull(result);
  }

  @Test
  @DisplayName("SpareService - getSpareById не найден")
  void spareService_getSpareById_NotFound() {
    when(spareRepository.findById(999L)).thenReturn(Optional.empty());
    final SpareDto result = spareService.getSpareById(999L);
    assertNull(result);
  }

  @Test
  @DisplayName("SpareService - getSpareByPartNumber found")
  void spareService_getSpareByPartNumber_Found() {
    when(spareRepository.findByPartNumber("OF-123")).thenReturn(Optional.of(testSpare));
    when(spareMapper.toDto(testSpare)).thenReturn(testSpareDto);
    final SpareDto result = spareService.getSpareByPartNumber("OF-123");
    assertNotNull(result);
  }

  @Test
  @DisplayName("SpareService - getSpareByPartNumber не найден")
  void spareService_getSpareByPartNumber_NotFound() {
    when(spareRepository.findByPartNumber("NOTEXIST")).thenReturn(Optional.empty());
    final SpareDto result = spareService.getSpareByPartNumber("NOTEXIST");
    assertNull(result);
  }

  @Test
  @DisplayName("SpareService - getSparesByManufacturer")
  void spareService_getSparesByManufacturer() {
    when(spareRepository.findByManufacturer("MANN")).thenReturn(List.of(testSpare));
    when(spareMapper.toDto(testSpare)).thenReturn(testSpareDto);
    final List<SpareDto> result = spareService.getSparesByManufacturer("MANN");
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("SpareService - getLowStockSpares")
  void spareService_getLowStockSpares() {
    when(spareRepository.findByQuantityInStockLessThan(10)).thenReturn(List.of(testSpare));
    when(spareMapper.toDto(testSpare)).thenReturn(testSpareDto);
    final List<SpareDto> result = spareService.getLowStockSpares(10);
    assertEquals(1, result.size());
  }

  @Test
  @DisplayName("SpareService - createSpare success")
  void spareService_createSpare_Success() {
    when(spareRepository.findByPartNumber("OF-123")).thenReturn(Optional.empty());
    when(spareMapper.toEntity(testSpareDto)).thenReturn(testSpare);
    when(spareRepository.save(testSpare)).thenReturn(testSpare);
    when(spareMapper.toDto(testSpare)).thenReturn(testSpareDto);
    final SpareDto result = spareService.createSpare(testSpareDto);
    assertNotNull(result);
    verify(spareRepository).save(testSpare);
  }

  @Test
  @DisplayName("SpareService - createSpare с дубликатом partNumber")
  void spareService_createSpare_DuplicatePartNumber() {
    when(spareRepository.findByPartNumber("OF-123")).thenReturn(Optional.of(testSpare));
    assertThrows(RuntimeException.class, () -> spareService.createSpare(testSpareDto));
    verify(spareRepository, never()).save(any());
  }

  @Test
  @DisplayName("SpareService - updateSpare success")
  void spareService_updateSpare_Success() {
    when(spareRepository.findById(1L)).thenReturn(Optional.of(testSpare));
    when(spareRepository.save(testSpare)).thenReturn(testSpare);
    when(spareMapper.toDto(testSpare)).thenReturn(testSpareDto);
    final SpareDto result = spareService.updateSpare(1L, testSpareDto);
    assertNotNull(result);
    verify(spareRepository).save(testSpare);
  }

  @Test
  @DisplayName("SpareService - updateSpare не найден")
  void spareService_updateSpare_NotFound() {
    when(spareRepository.findById(999L)).thenReturn(Optional.empty());
    assertThrows(RuntimeException.class, () -> spareService.updateSpare(999L, testSpareDto));
  }

  @Test
  @DisplayName("SpareService - deleteSpare success")
  void spareService_deleteSpare_Success() {
    doNothing().when(spareRepository).deleteById(1L);
    spareService.deleteSpare(1L);
    verify(spareRepository).deleteById(1L);
  }

  @Test
  @DisplayName("CarSearchCache - put, get и invalidateAll")
  void carSearchCache_PutGetAndInvalidate() {
    final CarSearchCache cache = new CarSearchCache();
    final CarSearchFilter filter = new CarSearchFilter("Toyota", null, null, null, null, null);
    final CarSearchCacheKey key = new CarSearchCacheKey("jpql", filter, 0, 10, "");
    final Page<CarDto> page = new PageImpl<>(List.of(testCarDto));
    cache.put(key, page);
    final Page<CarDto> result = cache.get(key);
    assertNotNull(result);
    assertEquals(1, result.getContent().size());
    cache.invalidateAll();
    assertNull(cache.get(key));
  }

  @Test
  @DisplayName("CarSearchFilter - нормализация значений")
  void carSearchFilter_Normalization() {
    final CarSearchFilter filter1 = new CarSearchFilter(
        "  TOYOTA  ", "  CAMRY  ", "  IVAN  ", "  PETROV  ", 2020, 2025);
    assertEquals("toyota", filter1.getBrand());
    assertEquals("camry", filter1.getModel());
    assertEquals("ivan", filter1.getClientFirstName());
    assertEquals("petrov", filter1.getClientLastName());

    final CarSearchFilter filter2 = new CarSearchFilter(null, null, null, null, null, null);
    assertEquals("", filter2.getBrand());
    assertEquals("", filter2.getModel());
    assertEquals("", filter2.getClientFirstName());
    assertEquals("", filter2.getClientLastName());
    assertNull(filter2.getYearFrom());
    assertNull(filter2.getYearTo());

    final CarSearchFilter filter3 = new CarSearchFilter("   ", "   ", "   ", "   ", 2020, 2025);
    assertEquals("", filter3.getBrand());
    assertEquals("", filter3.getModel());
    assertEquals("", filter3.getClientFirstName());
    assertEquals("", filter3.getClientLastName());

    final CarSearchFilter filter4 = new CarSearchFilter("Toyota", null, null, null, null, null);
    assertEquals("toyota", filter4.getBrand());
    assertEquals("", filter4.getModel());

    final CarSearchFilter filter5 = new CarSearchFilter(null, "Camry", null, null, null, null);
    assertEquals("", filter5.getBrand());
    assertEquals("camry", filter5.getModel());

    final CarSearchFilter filter6 = new CarSearchFilter(null, null, "Ivan", null, null, null);
    assertEquals("ivan", filter6.getClientFirstName());

    final CarSearchFilter filter7 = new CarSearchFilter(null, null, null, "Petrov", null, null);
    assertEquals("petrov", filter7.getClientLastName());

    final CarSearchFilter filter8 = new CarSearchFilter(null, null, null, null, 2020, null);
    assertEquals(2020, filter8.getYearFrom());
    assertNull(filter8.getYearTo());

    final CarSearchFilter filter9 = new CarSearchFilter(null, null, null, null, null, 2025);
    assertNull(filter9.getYearFrom());
    assertEquals(2025, filter9.getYearTo());
  }

  @Test
  @DisplayName("OrderService - updateOrder с COMPLETED статусом (устанавливается completionDate)")
  void orderService_updateOrder_CompletedWithNullCompletionDate() {
    testOrder.setCompletionDate(null);
    final OrderDto updateDto = OrderDto.builder()
        .carId(1L)
        .status("COMPLETED")
        .description("Updated")
        .totalPrice(200.0)
        .build();
    when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(updateDto);

    final OrderDto result = orderService.updateOrder(1L, updateDto);

    assertNotNull(result);
    assertNotNull(testOrder.getCompletionDate());
    verify(orderRepository).save(testOrder);
  }

  @Test
  @DisplayName("OrderService - updateOrder с не-COMPLETED статусом не устанавливает completionDate")
  void orderService_updateOrder_NonCompletedStatusNoCompletionDate() {
    testOrder.setCompletionDate(null);
    final OrderDto updateDto = OrderDto.builder()
        .carId(1L)
        .status("IN_PROGRESS")
        .description("Updated")
        .totalPrice(200.0)
        .build();
    when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(updateDto);

    final OrderDto result = orderService.updateOrder(1L, updateDto);

    assertNotNull(result);
    assertNull(testOrder.getCompletionDate());
    verify(orderRepository).save(testOrder);
  }

  @Test
  @DisplayName("OrderService - updateOrder с новым carId")
  void orderService_updateOrder_WithNewCarId() {
    final Car newCar = Car.builder().id(2L).build();
    final OrderDto updateDto = OrderDto.builder()
        .carId(2L)
        .description("Updated")
        .status("IN_PROGRESS")
        .build();
    when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
    when(carRepository.findById(2L)).thenReturn(Optional.of(newCar));
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(updateDto);

    final OrderDto result = orderService.updateOrder(1L, updateDto);

    assertNotNull(result);
    assertEquals(newCar, testOrder.getCar());
    verify(carRepository).findById(2L);
    verify(orderRepository).save(testOrder);
  }

  @Test
  @DisplayName("OrderService - updateOrder с null carId (не меняет car)")
  void orderService_updateOrder_WithNullCarIdNoChange() {
    final Car originalCar = testOrder.getCar();
    final OrderDto updateDto = OrderDto.builder()
        .carId(null)
        .description("Updated")
        .status("IN_PROGRESS")
        .build();
    when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(updateDto);

    final OrderDto result = orderService.updateOrder(1L, updateDto);

    assertNotNull(result);
    assertEquals(originalCar, testOrder.getCar());
    verify(carRepository, never()).findById(any());
    verify(orderRepository).save(testOrder);
  }

  @Test
  @DisplayName("OrderService - updateOrder с null description и totalPrice")
  void orderService_updateOrder_WithNullFields() {
    final OrderDto updateDto = OrderDto.builder()
        .carId(1L)
        .description(null)
        .totalPrice(null)
        .status("IN_PROGRESS")
        .build();
    when(orderRepository.findById(1L)).thenReturn(Optional.of(testOrder));
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderRepository.save(testOrder)).thenReturn(testOrder);
    when(orderMapper.toDto(testOrder)).thenReturn(updateDto);

    final OrderDto result = orderService.updateOrder(1L, updateDto);

    assertNotNull(result);
    assertNull(testOrder.getDescription());
    assertNull(testOrder.getTotalPrice());
    verify(orderRepository).save(testOrder);
  }

  @Test
  @DisplayName("OrderService - createOrder с существующим orderDate и status (не перезаписываются)")
  void orderService_createOrder_WithExistingOrderDateAndStatus() {
    final LocalDateTime existingDate = LocalDateTime.of(2024, 1, 15, 10, 0);
    final OrderDto dto = OrderDto.builder()
        .carId(1L)
        .totalPrice(100.0)
        .build();
    final Order orderToSave = Order.builder()
        .car(testCar)
        .orderDate(existingDate)
        .status("IN_PROGRESS")
        .services(new HashSet<>())
        .spares(new HashSet<>())
        .build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderMapper.toEntity(dto)).thenReturn(orderToSave);
    when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
      final Order saved = invocation.getArgument(0);
      saved.setId(1L);
      assertEquals(existingDate, saved.getOrderDate());
      assertEquals("IN_PROGRESS", saved.getStatus());
      return saved;
    });
    when(orderMapper.toDto(any(Order.class))).thenReturn(dto);

    final OrderDto result = orderService.createOrder(dto);

    assertNotNull(result);
    verify(orderRepository).save(any(Order.class));
  }

  @Test
  @DisplayName("OrderService - createOrder с уже установленным totalPrice (не пересчитывается)")
  void orderService_createOrder_WithExistingTotalPrice() {
    final OrderDto dto = OrderDto.builder()
        .carId(1L)
        .serviceIds(List.of(1L))
        .spareIds(List.of(1L))
        .totalPrice(999.99)
        .build();
    final Order orderToSave = Order.builder()
        .car(testCar)
        .totalPrice(999.99)
        .services(new HashSet<>())
        .spares(new HashSet<>())
        .build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(serviceRepository.findAllById(List.of(1L))).thenReturn(List.of(testService));
    when(spareRepository.findAllById(List.of(1L))).thenReturn(List.of(testSpare));
    when(orderMapper.toEntity(dto)).thenReturn(orderToSave);
    when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
      final Order saved = invocation.getArgument(0);
      saved.setId(1L);
      assertEquals(999.99, saved.getTotalPrice(), 0.01);
      return saved;
    });
    when(orderMapper.toDto(any(Order.class))).thenReturn(dto);

    final OrderDto result = orderService.createOrder(dto);

    assertNotNull(result);
    verify(orderRepository).save(any(Order.class));
  }

  @Test
  @DisplayName("OrderService - findCarById выбрасывает исключение когда машина не найдена")
  void orderService_findCarById_ThrowsException() {
    final OrderDto dto = OrderDto.builder()
        .carId(999L)
        .build();
    when(carRepository.findById(999L)).thenReturn(Optional.empty());
    when(orderMapper.toEntity(dto)).thenReturn(testOrder);

    final OrderNotFoundException exception = assertThrows(OrderNotFoundException.class,
        () -> orderService.createOrder(dto));

    assertTrue(exception.getMessage().contains("Car not found with id: 999"));
    verify(carRepository).findById(999L);
  }

  @Test
  @DisplayName("OrderService - getServiceSet с null serviceIds возвращает пустой Set")
  void orderService_getServiceSet_NullServiceIds() {
    final OrderDto dto = OrderDto.builder()
        .carId(1L)
        .serviceIds(null)
        .build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderMapper.toEntity(dto)).thenReturn(testOrder);
    when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
    when(orderMapper.toDto(any(Order.class))).thenReturn(dto);

    final OrderDto result = orderService.createOrder(dto);

    assertNotNull(result);
    verify(serviceRepository, never()).findAllById(any());
  }

  @Test
  @DisplayName("OrderService - getSpareSet с null spareIds возвращает пустой Set")
  void orderService_getSpareSet_NullSpareIds() {
    final OrderDto dto = OrderDto.builder()
        .carId(1L)
        .spareIds(null)
        .build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderMapper.toEntity(dto)).thenReturn(testOrder);
    when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
    when(orderMapper.toDto(any(Order.class))).thenReturn(dto);

    final OrderDto result = orderService.createOrder(dto);

    assertNotNull(result);
    verify(spareRepository, never()).findAllById(any());
  }

  @Test
  @DisplayName("OrderService - createOrderWithTransaction с непустым списком serviceIds")
  void orderService_createOrderWithTransaction_WithNonEmptyServiceIds() {
    final OrderDto dto = OrderDto.builder()
        .carId(1L)
        .serviceIds(List.of(1L, 2L))
        .build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderMapper.toEntity(dto)).thenReturn(testOrder);
    when(orderRepository.save(any(Order.class))).thenReturn(testOrder);
    when(serviceRepository.findAllById(List.of(1L, 2L)))
        .thenReturn(List.of(testService, testService));

    final OrderOperationException exception = assertThrows(OrderOperationException.class,
        () -> orderService.createOrderWithTransaction(dto));

    assertTrue(exception.getMessage().contains("Всё должно откатиться"));
    verify(serviceRepository).findAllById(List.of(1L, 2L));
    verify(orderRepository, times(2)).save(any(Order.class));
  }

  @Test
  @DisplayName("OrderService - createOrderWithTransaction с пустым списком serviceIds")
  void orderService_createOrderWithTransaction_EmptyServiceIds() {
    final OrderDto dto = OrderDto.builder()
        .carId(1L)
        .serviceIds(List.of())
        .build();
    when(carRepository.findById(1L)).thenReturn(Optional.of(testCar));
    when(orderMapper.toEntity(dto)).thenReturn(testOrder);
    when(orderRepository.save(testOrder)).thenReturn(testOrder);

    assertThrows(OrderOperationException.class,
        () -> orderService.createOrderWithTransaction(dto));
  }


  @Test
  @DisplayName("CarSearchFilter - equals и hashCode")
  void carSearchFilter_EqualsAndHashCode() {
    final CarSearchFilter filter1 = new CarSearchFilter(
        "Toyota", "Camry", "Ivan", "Petrov", 2020, 2025);
    final CarSearchFilter filter2 = new CarSearchFilter(
        "Toyota", "Camry", "Ivan", "Petrov", 2020, 2025);
    final CarSearchFilter filter3 = new CarSearchFilter("BMW", "X5", null, null, null, null);
    final CarSearchFilter filter4 = new CarSearchFilter(
        "  TOYOTA  ", "  CAMRY  ", "  IVAN  ", "  PETROV  ", 2020, 2025);

    assertTrue(filter1.equals(filter1));

    assertFalse(filter1.equals(null));
    assertFalse(filter1.equals("string"));

    assertEquals(filter1, filter2);
    assertNotEquals(filter1, filter3);
    assertEquals(filter1, filter4);
    assertNotEquals(filter1, null);
    assertNotEquals(filter1, "string");
    assertEquals(filter1.hashCode(), filter2.hashCode());

    CarSearchFilter filterDiffBrand = new CarSearchFilter(
        "Honda", "Camry", "Ivan", "Petrov", 2020, 2025);
    assertNotEquals(filter1, filterDiffBrand);

    CarSearchFilter filterDiffModel = new CarSearchFilter(
        "Toyota", "Accord", "Ivan", "Petrov", 2020, 2025);
    assertNotEquals(filter1, filterDiffModel);

    CarSearchFilter filterDiffFirstName = new CarSearchFilter(
        "Toyota", "Camry", "Peter", "Petrov", 2020, 2025);
    assertNotEquals(filter1, filterDiffFirstName);

    CarSearchFilter filterDiffLastName = new CarSearchFilter(
        "Toyota", "Camry", "Ivan", "Ivanov", 2020, 2025);
    assertNotEquals(filter1, filterDiffLastName);

    CarSearchFilter filterDiffYearFrom = new CarSearchFilter(
        "Toyota", "Camry", "Ivan", "Petrov", 2021, 2025);
    assertNotEquals(filter1, filterDiffYearFrom);

    CarSearchFilter filterDiffYearTo = new CarSearchFilter(
        "Toyota", "Camry", "Ivan", "Petrov", 2020, 2024);
    assertNotEquals(filter1, filterDiffYearTo);

    CarSearchFilter filterNullYears = new CarSearchFilter(
        "Toyota", "Camry", "Ivan", "Petrov", null, null);
    CarSearchFilter filterNullYears2 = new CarSearchFilter(
        "Toyota", "Camry", "Ivan", "Petrov", null, null);
    assertEquals(filterNullYears, filterNullYears2);
    assertNotEquals(filterNullYears, filter1);

    // Проверка hashCode для null значений
    CarSearchFilter filterNullBrand = new CarSearchFilter(
        null, "Camry", "Ivan", "Petrov", 2020, 2025);
    CarSearchFilter filterNullBrand2 = new CarSearchFilter(
        null, "Camry", "Ivan", "Petrov", 2020, 2025);
    assertEquals(filterNullBrand, filterNullBrand2);
    assertEquals(filterNullBrand.hashCode(), filterNullBrand2.hashCode());

    CarSearchFilter filterEmptyValues = new CarSearchFilter(
        "", "", "", "", null, null);
    CarSearchFilter filterEmptyValues2 = new CarSearchFilter(
        "", "", "", "", null, null);
    assertEquals(filterEmptyValues, filterEmptyValues2);
  }

  @Test
  @DisplayName("CarSearchCacheKey - equals все ветки")
  void carSearchCacheKey_EqualsAllBranches() {
    final CarSearchFilter filter = new CarSearchFilter(
        "Toyota", "Camry", "Ivan", "Petrov", 2020, 2025);

    final CarSearchCacheKey key1 = new CarSearchCacheKey("jpql", filter, 5, 20, "id,desc");
    final CarSearchCacheKey key2 = new CarSearchCacheKey("jpql", filter, 5, 20, "id,desc");

    assertTrue(key1.equals(key1));
    assertFalse(key1.equals(null));
    assertFalse(key1.equals("string"));
    assertFalse(key1.equals(filter));
    assertTrue(key1.equals(key2));

    CarSearchCacheKey diffSearchType = new CarSearchCacheKey("native", filter, 5, 20, "id,desc");
    assertFalse(key1.equals(diffSearchType));

    CarSearchFilter diffFilter = new CarSearchFilter("BMW", "X5", null, null, null, null);
    CarSearchCacheKey diffFilterKey = new CarSearchCacheKey("jpql", diffFilter, 5, 20, "id,desc");
    assertFalse(key1.equals(diffFilterKey));

    CarSearchCacheKey nullFilterKey = new CarSearchCacheKey("jpql", null, 5, 20, "id,desc");
    CarSearchCacheKey notNullFilterKey = new CarSearchCacheKey("jpql", filter, 5, 20, "id,desc");
    assertFalse(nullFilterKey.equals(notNullFilterKey));
    assertFalse(notNullFilterKey.equals(nullFilterKey));
    assertTrue(nullFilterKey.equals(new CarSearchCacheKey("jpql", null, 5, 20, "id,desc")));

    CarSearchCacheKey diffPage = new CarSearchCacheKey("jpql", filter, 10, 20, "id,desc");
    assertFalse(key1.equals(diffPage));

    CarSearchCacheKey diffSize = new CarSearchCacheKey("jpql", filter, 5, 50, "id,desc");
    assertFalse(key1.equals(diffSize));

    CarSearchCacheKey diffSort = new CarSearchCacheKey("jpql", filter, 5, 20, "name,asc");
    assertFalse(key1.equals(diffSort));

    CarSearchCacheKey nullSortKey = new CarSearchCacheKey("jpql", filter, 5, 20, null);
    CarSearchCacheKey notNullSortKey = new CarSearchCacheKey("jpql", filter, 5, 20, "id,desc");
    assertFalse(nullSortKey.equals(notNullSortKey));
    assertFalse(notNullSortKey.equals(nullSortKey));
    assertTrue(nullSortKey.equals(new CarSearchCacheKey("jpql", filter, 5, 20, null)));

    CarSearchCacheKey nullSearchTypeKey = new CarSearchCacheKey(null, filter, 5, 20, "id,desc");
    CarSearchCacheKey notNullSearchTypeKey = new CarSearchCacheKey("jpql",
        filter, 5, 20, "id,desc");
    assertFalse(nullSearchTypeKey.equals(notNullSearchTypeKey));
    assertFalse(notNullSearchTypeKey.equals(nullSearchTypeKey));
    assertTrue(nullSearchTypeKey.equals(new CarSearchCacheKey(null, filter, 5, 20, "id,desc")));

    assertTrue(nullFilterKey.hashCode() == new CarSearchCacheKey("jpql", null, 5,
        20, "id,desc").hashCode());
    assertTrue(nullSortKey.hashCode() == new CarSearchCacheKey("jpql",
        filter, 5, 20, null).hashCode());
    assertTrue(nullSearchTypeKey.hashCode() == new CarSearchCacheKey(null, filter,
        5, 20, "id,desc").hashCode());
  }
}